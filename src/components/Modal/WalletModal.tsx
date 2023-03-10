import { WalletConnectorNotFoundError, WalletSwitchChainError } from "@/config/error";
import useTranslation from "@/hooks/useTranslation";
import { AtomBox } from "@/uikit/components/AtomBox";
import Button from "@/uikit/components/Button/Button";
import Tab from "@/uikit/components/TabMenu/Tab";
import TabMenu from "@/uikit/components/TabMenu/TabMenu";
import Text from "@/uikit/components/Text/Text";
import { atom, useAtom } from "jotai";
import { PropsWithChildren, useMemo, useState } from "react";
import { ModalWrapper } from "./Modal";
import { ModalV2, ModalV2Props } from "./ModalV2";
import { modalWrapperClass, promotedGradientClass, walletIconClass, walletSelectWrapperClass } from "./WalletModal.css";
import Image from "@/uikit/components/Image/Image";
import { SvgProps } from "@/uikit/components/SVG/types";

const errorAtom = atom<string>('')



type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
}

export const walletLocalStorageKey = 'wallet'

const lastUsedWalletNameAtom = atom<string>('')

lastUsedWalletNameAtom.onMount = (set) => {
    const preferred = localStorage?.getItem(walletLocalStorageKey)
    if (preferred) {
        set(preferred)
    }
}

type LinkOfDevice = string | DeviceLink

export type WalletConfigV2<T = unknown> = {
    id: string,
    title: string,
    icon: string | React.FC<React.PropsWithChildren<SvgProps>>,
    connectorId: T,
    deepLink?: string,
    installed?: boolean,
    guide?: LinkOfDevice,
    downloadLink?: LinkOfDevice,
    mobileOnly?: boolean,
    qrCode?: () => Promise<string>
}
interface WalletModalV2Props<T = unknown> extends ModalV2Props {
    wallets?: WalletConfigV2<T>[]
    login?: (connectorId: T) => Promise<any>
    docLink?: string
    docText?: string
}
const selectedWalletAtom = atom<WalletConfigV2<unknown> | null>(null)

export function useSelectedWallet<T>() {
    // @ts-ignore
    return useAtom<WalletConfigV2<T> | null>(selectedWalletAtom)
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

function WalletSelect<T>({ wallets, onClick, displayCount = 6 }: { wallets: WalletConfigV2<T>[], onClick: (wallet: WalletConfigV2<T>) => void, displayCount?: number }) {
    const { t } = useTranslation()
    const [showMore, setShowMore] = useState(false)
    const walletDisplayCount = wallets.length > displayCount ? displayCount - 1 : displayCount
    const walletsToShow = showMore ? wallets : wallets.slice(0, walletDisplayCount)
    const [selected] = useSelectedWallet()

    return (
        <AtomBox
            display="grid"
            overflowY="auto"
            overflowX="hidden"
            px={{ xs: '16px', sm: '48px' }}
            pb="12px"
            className={walletSelectWrapperClass}
        >
            {walletsToShow.map((wallet) => {
                const isImage = typeof wallet.icon === 'string'
                const Icon = wallet.icon
                return (
                    <Button
                        key={wallet.id}
                        variant="text"
                        height="auto"
                        as={AtomBox}
                        display="flex"
                        alignItems="center"
                        style={{ justifyContent: 'flex-start', letterSpacing: 'normal', padding: '0' }}
                        flexDirection="column"
                        onClick={() => onClick(wallet)}
                    >
                        <AtomBox className={wallet.installed && promotedGradientClass} p="2px" borderRadius="12px" mb="4px" style={{padding:"2px",marginBottom:"4px"}}>
                            <AtomBox
                                bgc="dropdown"
                                display="flex"
                                position="relative"
                                justifyContent="center"
                                alignItems="center"
                                className={walletIconClass}
                                style={{ borderRadius: '13px' }}
                            >
                                {isImage ? (
                                    <Image src={Icon as string} width={50} height={50} />
                                ) : (
                                    <Icon width={24} height={24} color="textSubtle" />
                                )}
                                {wallet.id === selected?.id && (
                                    <AtomBox position="absolute" inset="0" bgc="secondary" opacity="0.5" borderRadius="12px" />
                                )}
                            </AtomBox>
                        </AtomBox>
                        <Text fontSize="12px" textAlign="center">
                            {wallet.title}
                        </Text>
                    </Button>
                )
            })}
        </AtomBox>
    )
}

const MOBILE_DEFAULT_DISPLAY_COUNT = 6

function MobileModal<T>({
    wallets,
    connectWallet,
    docLink,
    docText, }: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & { connectWallet: (wallet: WalletConfigV2<T>) => void }) {

    const { t } = useTranslation()
    const [selected] = useSelectedWallet()
    const [error] = useAtom(errorAtom)

    const installedWallets: WalletConfigV2<T>[] = wallets.filter((w) => w.installed)
    const walletsToShow: WalletConfigV2<T>[] = wallets.filter((w) => {
        if (installedWallets.length) {
            return w.installed
        }
        return w.installed !== false || w.deepLink
    })

    return (
        <AtomBox width="full">
            {error ? (
                <AtomBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    style={{ gap: '24px' }}
                    textAlign="center"
                    p="24px"
                >
                </AtomBox>
            ) : (
                <Text color="textSubtle" small p="24px">
                    {t(
                        'Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.',
                    )}
                </Text>
            )
            }
            <AtomBox flex={1} py="16px" style={{ maxHeight: '230px' }} overflow="auto">
                <WalletSelect
                    displayCount={MOBILE_DEFAULT_DISPLAY_COUNT}
                    wallets={walletsToShow}
                    onClick={(wallet) => {
                        connectWallet(wallet)
                        if (wallet.deepLink && wallet.installed === false) {
                            window.open(wallet.deepLink)
                        }
                    }} />
            </AtomBox>
            <AtomBox>

            </AtomBox>
        </AtomBox>
    )
}

const TabContainer = ({ children, docLink, docText }: PropsWithChildren<{ docLink: string, docText: string }>) => {
    const [index, setIndex] = useState(0);
    const { t } = useTranslation()

    return (
        <AtomBox position="relative" zIndex="modal" className={modalWrapperClass}>
            <AtomBox position="absolute" style={{ top: '-50px' }}>
                <TabMenu activeIndex={index} onItemClick={setIndex} gap="0px" isColorInverse>
                    <Tab>{t('Connect Wallet')}</Tab>
                    <Tab>{t('What’s a Web3 Wallet?')}</Tab>
                </TabMenu>
            </AtomBox>
            <AtomBox
                display="flex"
                position="relative"
                background="gradientCardHeader"
                borderRadius="card"
                borderBottomRadius={{
                    xs: '0',
                    md: 'card',
                }}
                zIndex="modal"
                width="full"
            >
                {index === 0 && children}
            </AtomBox>
        </AtomBox>
    )
}
export function WalletModalV2<T = unknown>(props: WalletModalV2Props) {
    const { wallets: _wallets, login, docLink, docText, ...rest } = props

    const [lastUsedWalletName] = useAtom(lastUsedWalletNameAtom)
    const { t } = useTranslation()
    const wallets = useMemo(() => sortWallets(_wallets, lastUsedWalletName), [_wallets, lastUsedWalletName])
    const [, setSelected] = useSelectedWallet<T>()
    const [, setError] = useAtom(errorAtom)

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
                        <MobileModal connectWallet={connectWallet} wallets={wallets} />
                    </TabContainer>
                </AtomBox>
            </ModalWrapper>
        </ModalV2>
    )

}