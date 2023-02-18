import { DefaultTheme } from "styled-components";
import base from "./base";
import { lightColors } from "./colors";
import { light as  lightModal} from "@/styles/theme/modal";

const lightThem: DefaultTheme = {
    ...base,
    colors: lightColors,
    modal: lightModal,
};


export default lightThem