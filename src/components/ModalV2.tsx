import getPortalRoot from "@/utils/getPortalRoot";
import { HTMLAttributes, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, domMax, LazyMotion, Variants } from 'framer-motion';

import {
    BackgroundProps,
    BorderProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    GridProps as _GridProps,
    ColorProps,
    height,
} from "styled-system";
import { StyledModalWrapper } from "./ModalContext";

export interface BoxProps
    extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    Omit<ColorProps, "color">,
    HTMLAttributes<HTMLElement> { }


export interface ModalV2Props {
    isOpen?: boolean;
    onDismiss?: () => void;
    closeOnOverlayClick?: boolean;
    children?: React.ReactNode;
}


export const animationMap = {
    initial: "initial",
    animate: "animate",
    exit: "exit",
};

export const animationHandler = (element: HTMLElement | null) => {
    if (!element) return;
    if (element.classList.contains("appear")) {
        element.classList.remove("appear");
        element.classList.add("disappear");
    } else {
        element.classList.remove("disappear");
        element.classList.add("appear");
    }
};

export const animationVariants: Variants = {
    initial: { transform: "translateX(0px)" },
    animate: { transform: "translateX(0px)" },
    exit: { transform: "translateX(0px)" },
};

export function ModalV2({ isOpen, onDismiss, closeOnOverlayClick, children,...props }: ModalV2Props & BoxProps) {
    const animationRef = useRef<HTMLDivElement>(null);
    const portal = getPortalRoot();
    if (portal) {
        return createPortal(
            <LazyMotion features={domMax}>
                <AnimatePresence>
                    {isOpen && (
                        <StyledModalWrapper
                            ref={animationRef}
                            // @ts-ignore
                            onAnimationStart={() => animationHandler(animationRef.current)}
                            {...animationMap}
                            // variants={animationVariants}
                            transition={{ duration: 0.3 }}
                            {...props}
                        >
                            <div style={{background:'#000',height:'100px',width:'100px'}}></div>
                        </StyledModalWrapper>
                    )}
                </AnimatePresence>
            </LazyMotion>, portal
        )
    }

    return null

}