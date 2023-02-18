import getPortalRoot from "@/utils/getPortalRoot";
import { HTMLAttributes, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, domMax, LazyMotion, Variants } from 'framer-motion';


import { StyledModalWrapper } from "./ModalContext";
import { BoxProps } from "../Box/types";
import {Overlay} from "@/components/Overlay/Overlay";

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
    // 判断是否存在属性appear
    if (element.classList.contains("appear")) {
        element.classList.remove("appear");
        element.classList.add("disappear");
    } else {
        element.classList.remove("disappear");
        element.classList.add("appear");
    }
};

export const animationVariants: Variants = {
    initial: { transform: "translateX(0px)"},
    animate: { transform: "translateX(0px)"},
    exit: { transform: "translateX(0px)" },
};

export function ModalV2({ isOpen, onDismiss, closeOnOverlayClick, children,...props }: ModalV2Props & BoxProps) {
    const animationRef = useRef<HTMLDivElement>(null);

    const handleOverlayDismiss = () => {
        if(closeOnOverlayClick){
            onDismiss?.();
        }
    }
    const portal = getPortalRoot();
    if (portal) {
        return createPortal(
            <LazyMotion features={domMax}>
                <AnimatePresence>
                    {isOpen && (
                        <StyledModalWrapper
                            ref={animationRef}
                            // @ts-ignore
                            // 动画开始之前的时间处理函数
                            onAnimationStart={() => animationHandler(animationRef.current)}
                            // 设置相应的属性命以及属性值
                            {...animationMap}
                            // 具体的动画
                            variants={animationVariants}
                            // 设置动画的过度时间,动画设置的是整个div的变化过程
                            transition={{ duration: 0.3 }}
                            {...props}
                        >
                            <Overlay />
                        </StyledModalWrapper>
                    )}
                </AnimatePresence>
            </LazyMotion>, portal
        )
    }

    return null

}