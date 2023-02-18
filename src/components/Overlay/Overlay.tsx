import {useEffect} from "react";
import styled, { keyframes } from "styled-components";
import Box from "../Box/box";
import { BoxProps } from "../Box/types";

interface OverlayProps extends BoxProps {
    isUnmounting?: boolean;
}

const mountAnimation = keyframes`
    0% {
     opacity: 0;
    }
    100% {
     opacity: 1;
    }
`;
const StyledOverlay = styled(Box)<{isUnmounting?:boolean}> `
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.text99}`};
  z-index: 20;
  will-change: opacity;
  animation: ${mountAnimation} 350ms ease forwards;
  
`;

const BodyLock = () => {
    useEffect(() => {
        document.body.style.cssText = `
            overflow: hidden;
        `;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.cssText = `
            overflow: visible;
            overflow: overlay;
            `
        }
    }, [])

    return null
}
export const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = (props) => {
    return (
        <>
            <BodyLock />
            <StyledOverlay {...props}/>
        </>
    )
};