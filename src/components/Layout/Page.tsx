import Head from 'next/head'
import React from 'react'


export const PageMeta: React.FC<React.PropsWithChildren<{ symbol?: string }>> = ({ symbol }) => {
    const title = "测试Title"
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    symbol?: string
}

const Page:React.FC<React.PropsWithChildren<PageProps>> = ({ children,symbol,...props}) => {
    return (
        <>
            <PageMeta symbol={symbol} />
            {children}
        </>
    )
}