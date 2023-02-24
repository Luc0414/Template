import { useCallback, useState } from "react"
import usePreviousValue from "./usePreviousValue"

const useLastUpdated = () => {

    
    const [lastUpdated, setStateLastUpdated] = useState(() => Date.now())
    
    const previousLastUpdated = usePreviousValue(lastUpdated)

    const setLastUpdated = useCallback(() => {
        setStateLastUpdated(Date.now())
    }, [setStateLastUpdated])

    return { lastUpdated, previousLastUpdated, setLastUpdated }
}

export default useLastUpdated