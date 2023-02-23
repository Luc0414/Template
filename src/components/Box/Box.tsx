import { m as motion } from "framer-motion"
import styled from "styled-components"
import { background, border, color, layout, position, space } from "styled-system"
import { BoxProps } from "./types"

export const MotionBox = styled(motion.div) <BoxProps>`

`

const Box = styled.div<BoxProps>`
    ${background}
    ${border}
    ${layout}
    ${position}
    ${space}
    ${color}
`

export default Box;