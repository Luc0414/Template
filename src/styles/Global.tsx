import { createGlobalStyle } from 'styled-components'
import { MediaQueries } from './theme/types'
import { vars } from './theme/var.css'


export interface Theme {
    colors: typeof vars.colors,
    mediaQueries: MediaQueries
}

// 拓展接口
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Kanit', sans-serif;
    }

    body {
        background-color: ${({theme})=>theme.colors.background};
    }

    img {
        height: auto;
        max-width: 100%;
    }
`

export default GlobalStyle