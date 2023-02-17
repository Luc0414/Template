import { LanguageContext } from '@/utils/translation/Provider'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'




const useTranslation = () => {
  const languageContext = useContext(LanguageContext)

  if (languageContext === undefined) {
    throw new Error('Language context is undefined')
  }

  return languageContext
}

export default useTranslation
