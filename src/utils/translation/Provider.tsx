import useLastUpdated from "@/hooks/useLastUpdated";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { EN, languages } from "./config/languages";
import memoize from 'lodash/memoize'
import omitBy from 'lodash/omitBy'
import reduce from 'lodash/reduce'
import { fetchLocale, getLanguageCodeFromLS, LS_KEY } from "./helpers";
import { ContextApi, Language, ProviderState, TranslateFunction } from "./types";
import isUndefinedOrNull from "../isUndefinedOrNull";


const initialState: ProviderState = {
    isFetching: true,
    currentLanguage: EN,
}

const includesVariableRegex = new RegExp(/%\S+?%/, 'gm')

const translatedTextIncludesVariable = memoize((translatedText: string): boolean => {
    return !!translatedText?.match(includesVariableRegex)
})

const getRegExpForDataKey = memoize((dataKey: string): RegExp => {
    return new RegExp(`%${dataKey}%`, 'g')
  })


const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, {})

export const LanguageContext = createContext<ContextApi | undefined>(undefined)

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

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
        const fetchInitialLocales = async () => {
            const codeFromStorage = getLanguageCodeFromLS()

            if (codeFromStorage !== EN.locale) {
                const currentLocale = await fetchLocale(codeFromStorage)
                if (currentLocale) {
                    languageMap.set(codeFromStorage, currentLocale)
                    refresh()
                }
            }

            setState((prevState) => ({
                ...prevState,
                isFetching: false
            }))
        }
    }, [refresh])

    const setLanguage = useCallback(async (language) => {
        if (!languageMap.has(language.locale)) {
            setState((prevState) => ({
                ...prevState,
                isFetching: true,
            }))

            const locale = await fetchLocale(language.locale)

            if (locale) {
                languageMap.set(language.locale, locale)
                localStorage?.setItem(LS_KEY, language.locale)
                setState((prevState) => ({
                    ...prevState,
                    isFetching: false,
                    currentLanguage: language,
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    isFetching: false,
                }))
            }
        } else {
            localStorage?.setItem(LS_KEY, language.locale)
            setState((prevState) => ({
                ...prevState,
                isFetching: false,
                currentLanguage: language,
            }))
        }
    }, [])

    const translate: TranslateFunction = useCallback(
        (key, data) => {
            const translationSet = languageMap.get(currentLanguage.locale) ?? {}

            const translatedText = translationSet?.[key] || key

            if (data) {
                const includesVariable = translatedTextIncludesVariable(key)
                if (includesVariable){
                    return reduce(
                        omitBy(data, isUndefinedOrNull),
                        (result, dataValue, dataKey) => {
                          return result.replace(getRegExpForDataKey(dataKey), dataValue.toString())
                        },
                        translatedText,
                      )
                }
            }

            return translatedText
        }, 
        [currentLanguage, lastUpdated],
    )
    return <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>{children}</LanguageContext.Provider>
}