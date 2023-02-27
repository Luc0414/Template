import { useCallback, useState } from "react"
import usePreviousValue from "./usePreviousValue"

// 自定义 hook，用于获取上一次更新时间
const useLastUpdated = () => {

    // 通过 useState 创建 lastUpdated 状态和更新函数
    const [lastUpdated, setStateLastUpdated] = useState(() => Date.now())
    
    // 获取 lastUpdated 的上一次值
    const previousLastUpdated = usePreviousValue(lastUpdated)

    // useCallback 优化 setLastUpdated 函数的性能
    const setLastUpdated = useCallback(() => {
        setStateLastUpdated(Date.now())
    }, [setStateLastUpdated])

    // 返回 lastUpdated、previousLastUpdated 和 setLastUpdated
    return { lastUpdated, previousLastUpdated, setLastUpdated }
}

export default useLastUpdated