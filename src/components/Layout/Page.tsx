import Head from 'next/head'
import styled from 'styled-components'
import Container from './Container'

const StyledPage = styled(Container)`
    
`
export const PageMeta: React.FC<React.PropsWithChildren<{symbol?: string}>> = ({ symbol }) => {
    return (
        <Head>
            <title>{symbol}</title>
        </Head>
    )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    symbol?: string
}


export const Page:React.FC<React.PropsWithChildren<PageProps>> = ({children,symbol,...props}) => {
    return (
        <>
            <PageMeta symbol={symbol} />
            <StyledPage {...props}>{children}</StyledPage>
        </>
    )
}
