import { ModalTheme } from "@/components/Modal/types";
import { vars } from "@/style/vars.css"
import { MediaQueries, ZIndices } from "./types"

// 包含所有的样式类型，全局，主题样式他都包含
//这里是返回他的变量
export interface Theme {
    colors:typeof vars.colors,
    zIndices:ZIndices,
    modal: ModalTheme,
    mediaQueries: MediaQueries,
}

export { default as dark } from "./dark"
export { default as light} from './light'