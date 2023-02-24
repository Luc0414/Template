import { Page, PageMeta } from "@/components/Layout/Page"
import useTranslation from "@/hooks/useTranslation"
import store, { useAppDispatch, useStore } from "@/state"
import { updateVersion } from "@/state/global/actions"
import { EN, ZHCN } from "@/translation/config/languages"


const Home: React.FC<React.PropsWithChildren> = () => {
    const { setLanguage,t } = useTranslation()

    const dispatch = useAppDispatch()

    const updateversion = () => {
        dispatch(updateVersion())
    }

    return (
        <>
            <Page />
            <h1>Test Page</h1>
            <button onClick={() => {setLanguage(ZHCN)}}>简体中文</button>
            <button onClick={() => {setLanguage(EN)}}>英语</button>
            <button onClick={updateversion}>updateversion</button>
            <p>{t('Connect Wallet')}</p>
        </>
    )
}

export default Home