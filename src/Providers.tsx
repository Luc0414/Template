import { Store } from '@reduxjs/toolkit'
import { LanguageProvider } from './context/translation'
import { Provider } from 'react-redux'

const Providers: React.FC<React.PropsWithChildren<{ store?: Store }>> = ({ children, store }) => {
    return (
        <Provider store={store}>
            <LanguageProvider>
                {children}
            </LanguageProvider >
        </Provider>

    )

}

export default Providers