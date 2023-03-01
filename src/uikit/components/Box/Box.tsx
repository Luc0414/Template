import { m as motion } from "framer-motion"
import styled from "styled-components"
import { background, border, color, layout, position, space } from "styled-system"
import { BoxProps } from "./types"

// 创建带有 framer-motion 动画特性的 div，利用 styled-components 进行样式定义
export const MotionBox = styled(motion.div) <BoxProps>`

`

// 基本的 div，利用 styled-components 进行样式定义，并加上了几个方便的 styled-system 样式属性
const Box = styled.div<BoxProps>`
    ${background}
    ${border}
    ${layout}
    ${position}
    ${space}
    ${color}
`

export default Box;