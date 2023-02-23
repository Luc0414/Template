import translations from "@/config/translations.json"

// ContextData 接口用于表示翻译的数据，可以是字符串或数字
export type ContextData = {
    [key: string]: string | number
}

// Language 接口用于表示当前语言的信息，包括语言代码、语言名称和区域
export interface Language {
    code: string;
    language: string;
    locale: string;
}

// ProviderState 接口用于表示上下文提供器的状态，包括是否正在获取翻译数据和当前语言
export interface ProviderState {
    isFetching: boolean;
    currentLanguage: Language

}

// ContextAPI 接口扩展了 ProviderState 接口，同时包括了设置语言的方法 setLanguage 和翻译方法 t
export interface ContextAPI extends ProviderState {
    setLanguage?: (language) => void,
    t?:TranslateFunction
}

// MaybeObject 表示空对象类型
type MaybeObject = Record<never, never>

// TranslationKey 表示翻译的键，可以是翻译文件中的键名，也可以是自定义的字符串，即使是空对象也可以
export type TranslationKey = keyof typeof translations | (string & MaybeObject)

// TranslateFunction 是翻译函数类型，用于将键名和数据翻译为字符串并返回
export type TranslateFunction = (key: TranslationKey, data?: ContextData) => string