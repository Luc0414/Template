import { Theme } from "@/uikit/theme";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Kanit', 'Ma Shan Zheng',sans-serif;
    }

    body {
        background-color:${({theme}) => theme.colors.background}
    }
`;

export default GlobalStyle