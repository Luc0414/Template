import useTranslation from "@/hooks/useTranslation"
import { EN, ZHCN } from "@/utils/translation/config/languages"

const TestButton = () => {
    const { setLanguage } = useTranslation()
    const setZHCN = () => {
        setLanguage(ZHCN)
    }

    const setEN = () => {
        setLanguage(EN)
    }
    return (
        <>
            <button onClick={setZHCN}>简体中文</button>
            <button onClick={setEN}>English</button>
        </>
    )
}

export default TestButton