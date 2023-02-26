import { vars } from "@/style/vars.css"

// 包含所有的样式类型，全局，主题样式他都包含
export interface Theme {
    colors:typeof vars.colors
}

export { default as dark } from "./dark"
export { default as light} from './light'