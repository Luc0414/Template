import Providers from '@/Providers'
import { persistor, useStore } from '@/state'
import GlobalStyle from '@/style/Global'
import ResetCSS from '@/style/ResetCSS'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { NextPage } from 'next'


function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>

      <Providers store={store}>
        <ResetCSS />
        <GlobalStyle />
        <PersistGate loading={null} persistor={persistor}>
          <App {...props} />
        </PersistGate>
      </Providers>
    </>
  )

}

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


export default MyApp