import { Language } from "@/context/translation";


export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const ZHCN: Language = { locale: 'zh-CN', language: '简体中文', code: 'zh-cn' }

export const languages: Record<string, Language> = {
    'en-US': EN,
    'zh-CN': ZHCN,
}