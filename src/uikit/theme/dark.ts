import { DefaultTheme } from "styled-components";
import base from "./base";
import { darkColors } from "./color";
import { dark as darkModal } from "@/components/Modal/theme"

const darkTheme:DefaultTheme = {
    ...base,
    colors:darkColors,
    modal: darkModal,
}

export default darkTheme