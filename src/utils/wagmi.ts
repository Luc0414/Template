import { configureChains, createClient } from 'wagmi'
import { bsc, bscTestnet, mainnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { BinanceWalletConnector } from './connectors/binanceWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import memoize from 'lodash/memoize'
import { BloctoConnector } from './connectors/blocto'

// 配置支持网络的地方
const CHAINS = [bsc, bscTestnet, mainnet]


export const { provider, chains } = configureChains(
    CHAINS,
    [jsonRpcProvider({
        rpc: (chain) => {
            if (chain.id === bsc.id) {
                return { http: "https://bsc-dataseed1.binance.org/" }
            }
            if (chain.id === mainnet.id) {
                return { http: 'https://cloudflare-eth.com' }
            }

            return { http: chain.rpcUrls.default.http[0] }
        }
    })
    ]
)

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: 'PancakeSwap',
        appLogoUrl: 'https://pancakeswap.com/logo.png',
    },
})


export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true,
    },
})


export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

// 暂时无法使用的
const bloctoConnector = new BloctoConnector({
    chains,
    options: {
        defaultChainId: 56,
        appId: 'e2f2f0cd-3ceb-4dec-b293-bb555f2ed5af',
    },
})

const ledgerConnector = new LedgerConnector({
    chains,
})
export const bscConnector = new BinanceWalletConnector({ chains })


export const client = createClient({
    autoConnect: false,
    provider,
    connectors: [
        bscConnector,
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        metaMaskConnector,
        bloctoConnector,
        ledgerConnector
    ]
})

export const CHAIN_IDS: number[] = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => { return CHAIN_IDS.includes(chainId) })