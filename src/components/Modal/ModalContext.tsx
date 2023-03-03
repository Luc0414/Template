import styled, { keyframes } from "styled-components";
import { AnimatePresence, domMax, LazyMotion, m } from "framer-motion";
import { appearAnimation, disappearAnimation } from "@/util/animationToolkit";
import { ModalContainer } from "./styles";
import { mountAnimation, unmountAnimation } from "@/uikit/components/BottomDrawer/styles";




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
    z-index: ${({ theme }) => theme.zIndices.modal - 1};
    will-change: opacity;
    opacity: 0;

    &.appear {
        animation: ${appearAnimation} 0.3s ease-in-out forwards;
        ${ModalContainer}{
            animation: ${mountAnimation}  0.3s ease-in-out forwards;
            ${({ theme }) => theme.mediaQueries.md}{
                animation: none;
            }
        }
    }

    &.disappear {
        animation: ${disappearAnimation} 0.3s ease-in-out forwards;
        ${ModalContainer}{
            animation: ${unmountAnimation} 0.3s ease-in-out forwards;
            ${({ theme }) => theme.mediaQueries.md} {
                animation: none;
              }
        }

    }
`