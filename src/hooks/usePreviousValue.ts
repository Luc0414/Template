import { useEffect, useRef } from "react"


// 返回更新前的值
const usePreviousValue = <T>(value: T) => {
    const ref = useRef<T>()

    // 在组件更新时更新 ref.current 的值为传入值
    useEffect(()=>{
        ref.current = value
    }),[value]
    // 返回更新前的值
    return ref.current
}

export default usePreviousValue