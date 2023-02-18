import { DefaultTheme } from "styled-components";
import base from "./base";
import { darkColors } from "./colors";
import { dark as darkModal } from '@/styles/theme/modal'

const darkTheme:DefaultTheme = {
    ...base,
    colors:darkColors,
    modal: darkModal,
}

export default darkTheme