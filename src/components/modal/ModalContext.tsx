import styled from "styled-components";
import { keyframes } from "styled-components";
import { AnimatePresence, domMax, LazyMotion, m } from "framer-motion";
import { MotionBox } from "../Box/box";


// 创建动画函数
export const appearAnimation = keyframes`
  from { opacity:0 }
  to { opacity:1 }
`;

export const disappearAnimation = keyframes`
  from { opacity:1 }
  to { opacity:0 }
`;

export const ModalContainer = styled(MotionBox) <{ $minWidth: string }>`
  overflow: hidden;

  border-radius: 32px 32px 0px 0px;
  width: 100%;
  max-width: none !important;
  min-height: 300px;
`

export const StyledModalWrapper = styled(m.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    will-change: opacity;
    opacity: 0;

    &.appear {
        animation: ${appearAnimation} 0.3s ease-in-out forwards;
        ${ModalContainer} {

        }

    }

    &.disappear {
        animation: ${disappearAnimation} 0.3s ease-in-out forwards;
        ${ModalContainer} {
          
        }
    }
`