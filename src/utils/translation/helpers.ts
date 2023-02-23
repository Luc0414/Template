import { EN } from "./config/languages"

export const LS_KEY = 'language'


export const fetchLocale = async (language: string) => import(`./locales/${language}.json`).then(locale => locale.default).catch(error => null)


export const getLanguageCodeFromLS = () => {
    try{
        const codeFromStorage = localStorage.getItem(LS_KEY)

        return codeFromStorage || EN.locale
    }catch{
        return EN.locale
    }
}