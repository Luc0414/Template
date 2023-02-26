import { Page } from "@/components/Layout/Page"
import useTranslation from "@/hooks/useTranslation"
import { useAppDispatch } from "@/state"
import { EN, ZHCN } from "@/translation/config/languages"
import { useTheme as useNextTheme } from 'next-themes'



const Home: React.FC<React.PropsWithChildren> = () => {
    const { setLanguage, t } = useTranslation()
    const { setTheme } = useNextTheme()
    return (
        <>
            <Page />
            <h1>Test Page</h1>
            <div style={{ "display": "flex", "alignContent": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
                <button onClick={() => { setLanguage(ZHCN) }} style={{ "margin": "10px" }}>简体中文</button>
                <button onClick={() => { setLanguage(EN) }} style={{ "margin": "10px" }}>英语</button>
                <button onClick={() => { setTheme('dark') }} style={{ "margin": "10px" }}>Dark</button>
                <button onClick={() => { setTheme('light') }} style={{ "margin": "10px" }}>Light</button>
            </div>
            <p>{t('Connect Wallet')}</p>
        </>
    )
}

export default Home