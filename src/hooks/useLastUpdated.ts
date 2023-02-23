import { useCallback, useState } from "react"
import usePreviousValue from "./usePreviousValue"

const useLastUpdated = () => {

    // 当前更新时间的 state
    const [lastUpdated, setStateLastUpdated] = useState(() => Date.now())

    // 上次更新时间的 state，通过 usePreviousValue hook 获取
    const previousLastUpdated = usePreviousValue(lastUpdated)

    // 当使用useState返回的set函数更新状态时，组件会重新渲染。
    // 如果将useState返回的set函数包含在useCallback的依赖数组中，那么每次重新渲染时，useCallback都会返回一个新的函数引用，导致子组件重新渲染。
    const setLastUpdated = useCallback(() => {
        setStateLastUpdated(Date.now())
    }, [setStateLastUpdated])

    // 返回当前更新时间、上次更新时间和更新时间的更新函数
    return { lastUpdated, previousLastUpdated, setLastUpdated }
}

export default useLastUpdated