import { ChainId, getChainId } from "@/config/chains"
import { isChainSupported } from "@/config/wagmi"
import { atom } from "jotai"
import { useAtom, useAtomValue } from "jotai/react"
import { useRouter } from "next/router"
import { useDeferredValue } from "react"
import { useNetwork } from "wagmi"
import { useSessionChainId } from "./useSessionChainId"

// 定义原子状态
const queryChainIdAtom = atom(-1)

// 在挂载时处理查询参数中的网络 ID，并将其存储到原子状态中
queryChainIdAtom.onMount = (set) => {
    const params = new URL(window.location.href).searchParams
    let chainId


    const c = params.get('chain')
    if (!c) {
        chainId = params.get('chainId')
    } else {
        chainId = getChainId(c)
    }

    if (isChainSupported(+chainId)) {
        set(+chainId)
    } else {
        set(0)
    }

}
// 定义获取本地网络 ID 的函数
export const useLocalNetworkChain = () => {
    const [sessionChainId] = useSessionChainId()

    const queryChainId = useAtom(queryChainIdAtom)

    const { query } = useRouter()
    // 按照优先级获取本地网络 ID
    const chainid = +(sessionChainId || getChainId(query.chain as string) || queryChainId)

    if (isChainSupported(chainid)) {
        return chainid
    }

    return undefined
}

// 定义获取活动网络 ID 的函数
export const useActiveChainId = () => {

    const localChainId = useLocalNetworkChain()
    const queryChainId = useAtomValue(queryChainIdAtom)

    const { chain } = useNetwork()
    // 按照优先级获取活动网络 ID
    const chainId = localChainId ?? chain?.id ?? (queryChainId >= 0 ? ChainId.BSC : undefined)
    
    // 计算活动网络是否匹配本地网络
    const isNotMatched = useDeferredValue(chain && localChainId && chain.id !== localChainId)

    return {
        chainId,
        isWrongNetwork: (chain?.unsupported ?? false) || isNotMatched,
        isNotMatched
    }
}