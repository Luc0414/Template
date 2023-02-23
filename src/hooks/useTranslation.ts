import { LanguageContext } from "@/context/translation"
import { useContext } from "react"


const useTranslation = () =>  {
    const languageContext = useContext(LanguageContext)
    if(languageContext === undefined) throw new Error('Language context is undefined')

    return languageContext
}

export default useTranslation