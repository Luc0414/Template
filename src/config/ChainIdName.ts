import memoize from 'lodash/memoize'

// config 模板文件

export enum ChainId {
    ETHEREUM = 1,
    GOERLI = 5,
    BSC = 56,
    BSC_TESTNET = 97,
}

export const ChainIdName = {
    [ChainId.ETHEREUM]: 'eth',
    [ChainId.GOERLI]: 'goerli',
    [ChainId.BSC]: 'bsc',
    [ChainId.BSC_TESTNET]: 'bscTestnet',
  }

export const getChainId = memoize((chainName: string) => {
    if (!chainName) return undefined
    const parsedQueryChain = Object.entries(ChainIdName).find(([_, value]) => value === chainName)
    return Number(parsedQueryChain?.[0])
})