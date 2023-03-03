import { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import Box from "../Box/Box";
import { BoxProps } from "../Box/types";


const unmountAnimation = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const mountAnimation = keyframes`
    0% {
     opacity: 0;
    }
    100% {
     opacity: 1;
    }
  `;


interface OverlayProps extends BoxProps {
    isUnmounting?: boolean;
}

const StyledOverlay = styled(Box) <{ isUnmounting?: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.text99}`};
  z-index: 20;
  will-change: opacity;
  animation: ${mountAnimation} 350ms ease forwards;
  ${({ isUnmounting }) =>
        isUnmounting &&
        css`
      animation: ${unmountAnimation} 350ms ease forwards;
    `}
`;

const BodyLock = () => {
    useEffect(() => {
        document.body.style.cssText = `
        overflow: hidden;
      `;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.cssText = `
          overflow: visible;
          overflow: overlay;
        `;
        };
    }, []);

    return null;
};


export const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = (props) => {
    return (
        <>
            <BodyLock />
            <StyledOverlay role="presentation" {...props}/>
        </>
    )
}

export default Overlay;