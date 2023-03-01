import memoize from "lodash/memoize";
import invert from 'lodash/invert'

// 枚举所有支持的链ID
export enum ChainId {
    ETHEREUM = 1,
    GOERLI = 5,
    BSC = 56,
    BSC_TESTNET = 97,
}

// 将链ID映射到其查询参数名称
export const CHAIN_QUERY_NAME = {
    [ChainId.ETHEREUM]: 'eth',
    [ChainId.GOERLI]: 'goerli',
    [ChainId.BSC]: 'bsc',
    [ChainId.BSC_TESTNET]: 'bscTestnet',
} satisfies Record<ChainId, string>

// 将查询参数名称反向映射回链ID
const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

// 获取给定链名称的链ID，使用memoize函数进行缓存
export const getChainId = memoize((chainName: string) => {
    if (!chainName) return undefined
    return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] :undefined
})