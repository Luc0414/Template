import { DefaultTheme } from "styled-components";
import base from "./base";
import { lightColors } from "./color";
import { light as lightModal} from "@/components/Modal/theme"

const lightTheme:DefaultTheme = {
    ...base,
    colors:lightColors,
    modal: lightModal
}

export default lightTheme