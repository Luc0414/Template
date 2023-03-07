import useMatchBreakpoints from "@/hooks/useMatchBreakpoints";
import { useRef } from "react";
import { ModalContainer } from "./styles";
import { ModalWrapperProps } from "./types";

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;

export const ModalWrapper = ({ children, onDismiss, minWidth, hideCloseButton, ...props }: React.PropsWithChildren<ModalWrapperProps>) => {

    const { isMobile } = useMatchBreakpoints();
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
        // @ts-ignore
        <ModalContainer
            $minWidth={minWidth}
            drag={isMobile && !hideCloseButton ? "y" : false}
            dragConstraints={{ top: 0, bottom: 600 }}
            dragElastic={{ top: 0 }}
            dragSnapToOrigin
            ref={wrapperRef}
            // 需要先把该组件的动画设置为None，否则drag不生效
            onDragStart={() => { if (wrapperRef.current) wrapperRef.current.style.animation = "none"; }}
            onDragEnd={(e, info) => { if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss(); }}
            {...props}
        >
            {children}
        </ModalContainer>
    )
}