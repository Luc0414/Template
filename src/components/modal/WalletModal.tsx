import { usePreloadImages } from '@/hooks/usePreloadImage';
import useTranslation from '@/hooks/useTranslation';
import { WalletConnectorNotFoundError, WalletSwitchChainError } from '@/utils/error';
import { AnimatePresence, domMax, LazyMotion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import styled from "styled-components";
import { FC, useMemo, useTransition } from 'react'
import { ModalV2 } from './ModalV2';
import { ModalWrapper } from './Modal';


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

            </ModalWrapper>
        </ModalV2>
    )
}