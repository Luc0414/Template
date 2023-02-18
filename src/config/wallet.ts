import { WalletConfigV2 } from '@/components/modal/WalletModal';
import { ExtendEthereum } from '@/global';
import { chains, metaMaskConnector } from '@/utils/wagmi';
import { isFirefox } from 'react-device-detect'
// config 模板文件 看情况更改






export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  BSC = 'bsc',
  Blocto = 'blocto',
  WalletLink = 'coinbaseWallet',
  Ledger = 'ledger',
}

const walletsConfig = ({
  chainId,
  connect
}: {
  chainId: number
  connect: (connectorID: ConnectorNames) => void
}): WalletConfigV2<ConnectorNames>[] => {
  return [
    {
      id: 'metamask',
      title: 'Metamask',
      icon: '/images/wallets/metamask.png',
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask) && metaMaskConnector.ready,
      connectorId: ConnectorNames.MetaMask,
      deepLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
      downloadLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
    },
    {
      id: 'binance',
      title: 'Binance Wallet',
      icon: '/images/wallets/binance.png',
      installed: typeof window !== 'undefined' && Boolean(window.BinanceChain),
      connectorId: ConnectorNames.BSC,
      guide: {
        desktop: 'https://www.bnbchain.org/en/binance-wallet'
      },
      downloadLink: {
        desktop: isFirefox
          ? 'https://addons.mozilla.org/en-US/firefox/addon/binance-chain/?src=search'
          : 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
      }
    },
    {
      id:'coinbase',
      title:'Coinbase Wallet',
      icon:'/images/wallets/coinbase.png',
      connectorId:ConnectorNames.WalletLink
    },
    {
      id:'trust',
      title:'Trust Wallet',
      icon:'/images/wallets/trust.png',
      connectorId:ConnectorNames.Injected,
      installed:
        typeof window !== 'undefined' &&
        !(window.ethereum as ExtendEthereum)?.isSafePal && 
        (Boolean(window.ethereum?.isTrust) || Boolean((window.ethereum as ExtendEthereum)?.isTrustWallet)),
      deepLink: 'https://link.trustwallet.com/open_url',
      downloadLink: {
        desktop: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
      }
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
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera),
      downloadLink: 'https://www.opera.com/crypto/next',
    },
    {
      id: 'brave',
      title: 'Brave Wallet',
      icon: '/images/wallets/brave.png',
      connectorId: ConnectorNames.Injected,
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isBraveWallet),
      downloadLink: 'https://brave.com/wallet/',
    },
    {
      id: 'math',
      title: 'MathWallet',
      icon: '/images/wallets/mathwallet.png',
      connectorId: ConnectorNames.Injected,
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMathWallet),
    },
    {
      id: 'tokenpocket',
      title: 'TokenPocket',
      icon: '/images/wallets/tokenpocket.png',
      connectorId: ConnectorNames.Injected,
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isTokenPocket),
    },
    {
      id: 'safepal',
      title: 'SafePal',
      icon: '/images/wallets/safepal.png',
      connectorId: ConnectorNames.Injected,
      installed: typeof window !== 'undefined' && Boolean((window.ethereum as ExtendEthereum)?.isSafePal),
      downloadLink:
        'https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa',
    },
    {
      id: 'coin98',
      title: 'Coin98',
      icon: '/images/wallets/coin98.png',
      connectorId: ConnectorNames.Injected,
      installed:
        typeof window !== 'undefined' &&
        (Boolean((window.ethereum as ExtendEthereum)?.isCoin98) || Boolean(window.coin98)),
    },
    {
      id: 'blocto',
      title: 'Blocto',
      icon: '/images/wallets/blocto.png?v=2',
      connectorId: ConnectorNames.Blocto,
      get installed() {
        return typeof window !== 'undefined' && Boolean((window.ethereum as ExtendEthereum)?.isBlocto)
          ? true
          : undefined // undefined to show SDK
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

export const createWallets = (chainId:number,connect:any) => {
  const hasInjected = typeof window !== 'undefined' && !window.ethereum
  const config = walletsConfig({chainId,connect})
  return hasInjected && config.some((c) => c.installed && c.connectorId === ConnectorNames.Injected)
  ? config
  :[
    ...config,
    {
      id: 'injected',
      title: 'Injected',
      icon: "/images/wallets/inject.png",
      connectorId: ConnectorNames.Injected,
      installed: typeof window !== 'undefined' && Boolean(window.ethereum),
    },
  ]
}