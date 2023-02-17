import type { AppProps } from 'next/app'
import { persistor, useStore } from '@/state'
import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head'
import Providers from '@/Providers'
import GlobalStyle from '@/styles/Global'


export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Providers store={store}>
        <GlobalStyle />
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Providers>
    </>
  )

  
}
