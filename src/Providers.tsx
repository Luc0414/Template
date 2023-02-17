import { LanguageProvider } from "@/utils/translation/Provider";
import { Store } from '@reduxjs/toolkit';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, ThemeProvider } from "styled-components";
import { WagmiConfig } from 'wagmi';
import dark from './styles/theme/dark';
import light from './styles/theme/light';
import { client } from './utils/wagmi';

export const UIKitProvider: React.FC<React.PropsWithChildren<{ theme: DefaultTheme; children: React.ReactNode }>> = ({
    theme,
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
    const { resolvedTheme } = useNextTheme()
    return (
        <>
            <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
                {children}
            </UIKitProvider>
        </>
    )
}
const Proviers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({ children, store }) => {
    return (
        <WagmiConfig client={client}>
            <NextThemeProvider>
                <Provider store={store}>
                    <StyledUIKitProvider>
                        <LanguageProvider>
                            {children}
                        </LanguageProvider>
                    </StyledUIKitProvider>
                </Provider>
            </NextThemeProvider>
        </WagmiConfig>
    )
}

export default Proviers