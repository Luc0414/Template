import { configureChains, createClient } from 'wagmi'
import { bsc, bscTestnet, goerli, mainnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { chain, memoize } from 'lodash'

// 配置支持的链
const CHAINS = [bsc, bscTestnet, goerli, mainnet]


// 配置对应链的RPC地址
const ChainRpc = {
    [mainnet.id]: { http: 'https://cloudflare-eth.com' },
    [bsc.id]: { http: 'https://bsc-dataseed3.binance.org' },
    [bscTestnet.id]: { http: 'https://data-seed-prebsc-1-s3.binance.org:8545' },
    [goerli.id]: { http: 'https://rpc.ankr.com/eth_goerli' },
}

// 配置支持的 Provider 和 Chain
export const { provider, chains } = configureChains(
    CHAINS,
    [jsonRpcProvider({
        rpc: (chain) => {
            if (chain.id in ChainRpc) {
                return ChainRpc[chain.id]
            }
            return { http: chain.rpcUrls.default.http[0] }
        }
    })]
)

// 配置支持的 Connector
export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    }
})

export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: 'Swap',
        appLogoUrl: 'https://pancakeswap.com/logo.png',
    }
})

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true
    }
})


export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})


const ledgerConnector = new LedgerConnector({
    chains,
})

// 创建 Wagmi Client
export const client = createClient({
    autoConnect: false,
    provider,
    connectors: [
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        metaMaskConnector,
        ledgerConnector
    ]
})

// 获取支持的 Chain IDs
export const CHAINS_IDS: number[] = chains.map((c) => c.id)

// 判断指定的 Chain ID 是否被支持
export const isChainSupported = memoize((chainId: number) => CHAINS_IDS.includes(chainId))
