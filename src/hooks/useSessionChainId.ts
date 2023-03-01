import { atom,useAtom } from 'jotai'


// 创建一个包含number类型默认值的原子
const sessionChainIdAtom = atom<number>(0)

// 创建一个使用sessionChainIdAtom的自定义hook
export const useSessionChainId = () => {
    return useAtom(sessionChainIdAtom)
}