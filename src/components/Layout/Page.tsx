import useTranslation from '@/hooks/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Container from './Container'

const StyledPage = styled(Container)`
    
`
export const PageMeta: React.FC<React.PropsWithChildren<{ symbol?: string }>> = ({ symbol }) => {
    const { t, currentLanguage: { locale } } = useTranslation()
    const { pathname } = useRouter()

    return (
        <Head>
            <title>{symbol}</title>
        </Head>
    )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    symbol?: string
}


export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, symbol, ...props }) => {
    return (
        <>
            <PageMeta symbol={symbol} />
            <StyledPage {...props}>{children}</StyledPage>
        </>
    )
}
