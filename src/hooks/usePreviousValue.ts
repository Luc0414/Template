import { useEffect, useRef } from "react"


// 返回更新前的值
const usePreviousValue = <T>(value: T) => {
    const ref = useRef<T>()

    
    useEffect(()=>{
        ref.current = value
    }),[value]

    return ref.current
}

export default usePreviousValue