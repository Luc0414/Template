import useLastUpdated from "@/hooks/useLastUpdated";
import { EN, languages } from "@/utils/translation/config/languages";
import { getLanguageCodeFromLS } from "@/utils/translation/helpers";
import { memoize } from "lodash";
import { createContext, useCallback, useEffect, useState } from "react";
import { ContextAPI, Language, ProviderState, TranslateFunction } from "./types";

// 组件初始化
const initialState: ProviderState = {
    isFetching: true,
    currentLanguage: EN
}
export const LanguageContext = createContext<ContextAPI | undefined>(undefined)

const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, {})

// 检查是否包含占位符%%
const includesVariableRegex = new RegExp(/%\S+?%/, 'gm')

const translatedTextIncludesVariable = memoize((translatedText:string):boolean=>{
    return !!translatedText?.match(includesVariableRegex)
})

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    // 获取更新时间和设置更新时间的方法
    const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()

    const [state, setState] = useState<ProviderState>(() => {
        const codeFromStorage = getLanguageCodeFromLS()

        return {
            ...initialState,
            currentLanguage: languages[codeFromStorage] || EN
        }
    })

    const { currentLanguage } = state


    useEffect(() => {

    }, [refresh])


    const setLanguage = useCallback(async (language: Language) => {

    }, [])
    const translate: TranslateFunction = useCallback((key, data) => {

        // 获取指定语言对应的翻译集合
        const translationSet = languageMap.get(currentLanguage.locale) ?? {}
        // 翻译集合中获取对应 key 的翻译文本,如果没有对应的翻译文本则返回 key 本身
        const translatedText = translationSet?.[key] || key

        if(data){

        }

        return translatedText
    }, [])

    return <LanguageContext.Provider value={{ ...state }}>{children}</LanguageContext.Provider>
}