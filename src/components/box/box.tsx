import { background, border, layout, position, space, color } from "styled-system";
import { m as motion, Variants } from "framer-motion";
import styled from "styled-components";
import { BoxProps } from "./types";

export const MotionBox = styled(motion.div)<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;