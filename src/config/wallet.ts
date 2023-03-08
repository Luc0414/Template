import { WalletConfigV2 } from "@/components/Modal/WalletModal"
import { ExtendEthereum } from "@/global"
import { metaMaskConnector } from "./wagmi"

export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
    WalletConnect = 'walletConnect',
    BSC = 'bsc',
    Blocto = 'blocto',
    WalletLink = 'coinbaseWallet',
    Ledger = 'ledger',
    TrustWallet = 'trustWallet',
}

const isMetamaskInstalled = () => {
    if (typeof window === 'undefined') {
        return false
    }

    if (window.ethereum?.isMetaMask) {
        return true
    }

    if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
        return true
    }

    return false
}

const walletsConfig = ({ chainId, connect }: { chainId: number, connect: ((connectorID: ConnectorNames) => void) }): WalletConfigV2<ConnectorNames>[] => {
    return [
        {
            id: 'metamask',
            title: 'Metamask',
            icon: '/images/wallets/metamask.png',
            get installed() {
                return isMetamaskInstalled() && metaMaskConnector.ready
            },
            connectorId: ConnectorNames.MetaMask,
            deepLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
            downloadLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
        },
        {
            id: 'coinbase',
            title: 'Coinbase Wallet',
            icon: '/images/wallets/coinbase.png',
            connectorId: ConnectorNames.WalletLink,
        },
        {
            id: 'walletconnect',
            title: 'WalletConnect',
            icon: '/images/wallets/walletconnect.png',
            connectorId: ConnectorNames.WalletConnect,
        },
        {
            id: 'opera',
            title: 'Opera Wallet',
            icon: '/images/wallets/opera.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera)
            },
            downloadLink: 'https://www.opera.com/crypto/next',
        },
        {
            id: 'brave',
            title: 'Brave Wallet',
            icon: '/images/wallets/brave.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean(window.ethereum?.isBraveWallet)
            },
            downloadLink: 'https://brave.com/wallet/',
        },
        {
            id: 'math',
            title: 'MathWallet',
            icon: '/images/wallets/mathwallet.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean(window.ethereum?.isMathWallet)
            },
        },
        {
            id: 'tokenpocket',
            title: 'TokenPocket',
            icon: '/images/wallets/tokenpocket.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean(window.ethereum?.isTokenPocket)
            },
        },
        {
            id: 'safepal',
            title: 'SafePal',
            icon: '/images/wallets/safepal.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return typeof window !== 'undefined' && Boolean((window.ethereum as ExtendEthereum)?.isSafePal)
            },
            downloadLink:
                'https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa',
        },
        {
            id: 'coin98',
            title: 'Coin98',
            icon: '/images/wallets/coin98.png',
            connectorId: ConnectorNames.Injected,
            get installed() {
                return (
                    typeof window !== 'undefined' &&
                    (Boolean((window.ethereum as ExtendEthereum)?.isCoin98) || Boolean(window.coin98))
                )
            },
        },
        {
            id: 'ledger',
            title: 'Ledger',
            icon: '/images/wallets/ledger.png',
            connectorId: ConnectorNames.Ledger,
        },
    ]
}

export const createWallets = (chainId: number, connect: any) => {
    const hasInjected = typeof window !== 'undefined' && !window.ethereum
    const config = walletsConfig({chainId,connect})
    return hasInjected && config.some((c) => c.installed && c.connectorId === ConnectorNames.Injected)
    ? config
    : [
        ...config,
        {
            id: 'injected',
            title: 'Injected',
            icon: '/images/wallets/inject.png',
            connectorId: ConnectorNames.Injected,
            installed: typeof window !== 'undefined' && Boolean(window.ethereum),
          },
    ]
}