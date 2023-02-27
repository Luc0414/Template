import { LanguageContext } from "@/context/translation"
import { useContext } from "react"

// 自定义 hook，用于获取当前语言的上下文
const useTranslation = () =>  {
    // 获取语言上下文
    const languageContext = useContext(LanguageContext)
    // 如果上下文未定义，则抛出错误
    if(languageContext === undefined) throw new Error('Language context is undefined')
    // 返回语言上下文
    return languageContext
}

export default useTranslation