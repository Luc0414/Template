import { usePreloadImages } from '@/hooks/usePreloadImage';
import useTranslation from '@/hooks/useTranslation';
import { WalletConnectorNotFoundError, WalletSwitchChainError } from '@/utils/error';
import { atom, useAtom } from 'jotai';
import { FC, useMemo, useState } from 'react';
import { AtomBox } from '../AtomBox';
import { TabContainer } from '../Tab/TabContainer';
import { ModalV2 } from './ModalV2';
import { ModalWrapper } from './Modal';
import { isMobile } from 'react-device-detect';
import { desktopWalletSelectionClass } from '@/styles/modal/WalletModal.css';
import Heading from '../Heading/Heading';
import Text from '../Text/Text'

type LinkOfDevice = string | DeviceLink

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
}

export type WalletConfigV2<T = unknown> = {
    id: string
    title: string
    icon: string | FC<React.PropsWithChildren>
    connectorId: T
    deepLink?: string
    installed?: boolean
    guide?: LinkOfDevice
    downloadLink?: LinkOfDevice
    mobileOnly?: boolean
    qrCode?: () => Promise<string>
}

export interface ModalV2Props {
    isOpen?: boolean;
    onDismiss?: () => void;
    closeOnOverlayClick?: boolean;
    children?: React.ReactNode;
}

interface WalletModalV2Props<T = unknown> extends ModalV2Props {
    wallets: WalletConfigV2<T>[]
    login: (connectorId: T) => Promise<any>
    docLink?: string
    docText: string
}

const lastUsedWalletNameAtom = atom<string>('')

const errorAtom = atom<string>('')

const selectedWalletAtom = atom<WalletConfigV2<unknown> | null>(null)

export function useSelectedWallet<T>() {
    // @ts-ignore
    return useAtom<WalletConfigV2<T> | null>(selectedWalletAtom)
}

function DesktopModal<T>({
    wallets: wallets_,
    connectWallet,
    docLink,
    docText,
}: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & { connectWallet: (wallet: WalletConfigV2<T>) => void }) {
    const wallets: WalletConfigV2<T>[] = wallets_.filter((w) => {
        return w.installed !== false || (!w.installed && (w.guide || w.downloadLink || w.qrCode))
    })

    const [selected] = useSelectedWallet<T>()

    const [error] = useAtom(errorAtom)

    const [qrCode, setQrCode] = useState<string | undefined>(undefined)

    const { t } = useTranslation()

    const connectToWallet = (wallet: WalletConfigV2<T>) => {
        connectWallet(wallet)
    }

    return (
        <>
            <AtomBox
                display="flex"
                flexDirection="column"
                bg="backgroundAlt"
                py="32px"
                zIndex="modal"
                borderRadius="card"
                className={desktopWalletSelectionClass}
            >
                <AtomBox px="48px">
                    <Heading color="color" as="h4">
                        {t('Connect Wallet')}
                    </Heading>
                    <Text color="textSubtle" small pt="24px" pb="32px">
                        {t(
                            'Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.',
                        )}
                    </Text>
                </AtomBox>

                <WalletSelect
                    wallets={wallets}
                    onClick={(w) => {
                        connectToWallet(w)
                        setQrCode(undefined)
                        if (w.qrCode) {
                            w.qrCode().then((uri) => {
                                setQrCode(uri)
                            })
                        }
                    }}
                />
            </AtomBox>

            <AtomBox
                flex={1}
                mx="24px"
                display={{
                    xs: 'none',
                    sm: 'flex',
                }}
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                <AtomBox display="flex" flexDirection="column" alignItems="center" style={{ gap: '24px' }} textAlign="center">
                    {!selected && <Intro docLink={docLink} docText={docText} />}
                    {selected && selected.installed !== false && (
                        <>
                            {typeof selected.icon === 'string' && <Image src={selected.icon} width={108} height={108} />}
                            <Heading as="h1" fontSize="20px" color="secondary">
                                {t('Opening')} {selected.title}
                            </Heading>
                            {error ? (
                                <ErrorContent message={error} onRetry={() => connectToWallet(selected)} />
                            ) : (
                                <Text>{t('Please confirm in %wallet%', { wallet: selected.title })}</Text>
                            )}
                        </>
                    )}
                    {selected && selected.installed === false && <NotInstalled qrCode={qrCode} wallet={selected} />}
                </AtomBox>
            </AtomBox>
        </>
    )
}

function MobileModal<T>({ }: {}) {

}
function sortWallets<T>(wallets: WalletConfigV2<T>[], lastUsedWalletName: string | null) {
    const sorted = [...wallets].sort((a, b) => {
        if (a.installed === b.installed) return 0
        return a.installed === true ? -1 : 1
    })

    if (!lastUsedWalletName) {
        return sorted
    }
    const foundLastUsedWallet = wallets.find((w) => w.title === lastUsedWalletName)
    if (!foundLastUsedWallet) return sorted
    return [foundLastUsedWallet, ...sorted.filter((w) => w.id !== foundLastUsedWallet.id)]
}

const MOBILE_DEFAULT_DISPLAY_COUNT = 6

export const walletLocalStorageKey = 'wallet'

export function WalletModalV2<T = unknown>(props: WalletModalV2Props<T>) {
    const { wallets: _wallets, login, docLink, docText, ...rest } = props

    const [lastUsedWalletName] = useAtom(lastUsedWalletNameAtom)

    const wallets = useMemo(() => sortWallets(_wallets, lastUsedWalletName), [_wallets, lastUsedWalletName])

    const [, setSelected] = useSelectedWallet<T>()

    const [, setError] = useAtom(errorAtom)

    const { t } = useTranslation()

    const imageSources = useMemo(() => wallets
        .map((w) => w.icon)
        .filter((icon) => typeof icon === 'string')
        .concat('http://127.0.0.1/') as string[]
        , [wallets])

    usePreloadImages(imageSources.slice(0, MOBILE_DEFAULT_DISPLAY_COUNT))

    const connectWallet = (wallet: WalletConfigV2<T>) => {

        setSelected(wallet)
        setError('')

        if (wallet.installed !== false) {
            login(wallet.connectorId)
                .then((v) => {
                    if (v) {
                        localStorage.setItem(walletLocalStorageKey, wallet.title)
                    }
                })
                .catch((err) => {
                    if (err instanceof WalletConnectorNotFoundError) {
                        setError(t('no provider found'))
                    } else if (err instanceof WalletSwitchChainError) {
                        setError(err.message)
                    } else {
                        setError(t('Error connecting, please authorize wallet to access.'))
                    }
                })
        }
    }

    return (
        <ModalV2 closeOnOverlayClick {...rest}>
            <ModalWrapper onDismiss={props.onDismiss} style={{ overflow: 'visible', border: 'none' }}>
                <AtomBox position="relative">
                    <TabContainer docLink={docLink} docText={docText}>
                        {isMobile ? (<MobileModal />) : (<DesktopModal />)}
                    </TabContainer>
                </AtomBox>
            </ModalWrapper>
        </ModalV2>
    )
}