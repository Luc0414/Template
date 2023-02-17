import translations from "./config/translations.json"

export type ContextData = {
    [key: string]: string | number
}

export interface Language {
    code: string;
    language: string;
    locale: string;
}

export interface ProviderState {
    isFetching: boolean
    currentLanguage: Language
}

export interface ContextApi extends ProviderState {
    setLanguage: (language: Language) => void
    t: TranslateFunction
}


type MaybeObject = Record<never, never>

export type TranslationKey = keyof typeof translations | (string & MaybeObject)

export type TranslateFunction = (key: TranslationKey, data?: ContextData) => string