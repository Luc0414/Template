import { EN } from "./config/languages"


const publicUrl = process.env.NEXT_PUBLIC_APEX_URL || ''


export const LS_KEY = 'language'


export const fetchLocale = async (language: string) => {
    return import (`./locales/${language}.json`).then(locale => locale.default).catch((error) => null)
}


export const getLanguageCodeFromLS = () => {
    try {
        const codeFromStorage = localStorage.getItem("LS_KEY")

        return codeFromStorage || EN.locale
    } catch {
        return EN.locale
    }
}