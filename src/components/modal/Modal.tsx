import {ModalContainer} from "@/components/modal/styles";
import useMatchBreakpoints from "@/hooks/useMatchBreakpoints";
import {PropsWithChildren, useRef} from "react";
import { ModalWrapperProps } from "./types";

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;

export const ModalWrapper = ({children, onDismiss, minWidth, hideCloseButton, ...props}:PropsWithChildren<ModalWrapperProps>) => {
    const {isMobile} = useMatchBreakpoints();
    console.log(isMobile && !hideCloseButton ? "y" : false)
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
        // @ts-ignore
        <ModalContainer 
        $minWidth={minWidth}
        // 当 isMobile 为真且 hideCloseButton 为假时，此组件可以在 Y 轴方向拖动。
        drag={isMobile && !hideCloseButton ? "y" : false}
        // 表示此组件可以被拖动的范围限制。在此代码中，此组件只能在顶部与底部之间的位置上被拖动，顶部的位置为 0，底部的位置为 600。
        dragConstraints={{ top: 0, bottom: 600 }}
        // 此组件只在顶部的位置上具有弹性，即只能向下弹性地被拖动。
        dragElastic={{ top: 0 }}
        // 当此组件被释放时是否自动返回到原始位置
        dragSnapToOrigin
        // 当拖动开始时要执行的回调函数
        onDragStart={() => { if (wrapperRef.current) wrapperRef.current.style.animation = "none";}}
        // 表示当拖动结束时要执行的回调函数
        onDragEnd={(e, info) => { if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss();}}
        ref={wrapperRef}
        {...props}
        >
            {children}
        </ModalContainer>
    )

}