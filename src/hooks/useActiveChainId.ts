import { ChainId, getChainId } from "@/config/ChainIdName"
import { isChainSupported } from "@/utils/wagmi"
import { atom, useAtomValue } from 'jotai'
import { useRouter } from "next/router"
import { useDeferredValue } from "react"
import { useNetwork } from "wagmi"
import { useSessionChainId } from "./useSessionChainId"

// config 模板文件

const queryChainIdAtom = atom(-1)


export function useLocalNetworkChain() {
    const [ sessionChainId ] = useSessionChainId()
    
    const queryChainId = useAtomValue(queryChainIdAtom)
    
    const { query } = useRouter()
    const chainId = +(sessionChainId || getChainId(query.chain as string) || queryChainId)

    if (isChainSupported(chainId)) {
        return chainId
      }
    
      return undefined

}
export const useActiveChainId = () => {

    const localChainId = useLocalNetworkChain()

    const queryChainId = useAtomValue(queryChainIdAtom)

    const { chain } = useNetwork()

    const chainId = localChainId ?? chain?.id ?? (queryChainId>=0 ? ChainId.BSC : undefined)

    const isNotMatched = useDeferredValue(chain && localChainId && chain.id !== localChainId)

    return { chainId,
    isWrongNetwork: (chain?.unsupported ?? false) || isNotMatched,
    isNotMatched }
}