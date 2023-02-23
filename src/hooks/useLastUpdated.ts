import { useCallback, useState } from "react"
import usePreviousValue from "./usePreviousValue"

const useLastUpdated = () => {

    // 当前更新时间的 state
    const [lastUpdated, setStateLastUpdated] = useState(() => Date.now())

    // 上次更新时间的 state，通过 usePreviousValue hook 获取
    const previousLastUpdated = usePreviousValue(lastUpdated)

    // 更新当前更新时间的函数，使用 useCallback 以避免不必要的重新渲染
    const setLastUpdated = useCallback(() => {
        setStateLastUpdated(Date.now())
    }, [setStateLastUpdated])

    // 返回当前更新时间、上次更新时间和更新时间的更新函数
    return { lastUpdated, previousLastUpdated, setLastUpdated }
}

export default useLastUpdated