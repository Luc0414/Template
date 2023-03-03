import useMatchBreakpoints from "@/hooks/useMatchBreakpoints";
import { useRef } from "react";
import { ModalContainer } from "./styles";
import { ModalWrapperProps } from "./types";


export const ModalWrapper = ({ children, onDismiss, minWidth, hideCloseButton, ...props }: React.PropsWithChildren<ModalWrapperProps>) => {

    const { isMobile } = useMatchBreakpoints();
    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        // @ts-ignore
        <ModalContainer
            $minWidth={minWidth}
        >

        </ModalContainer>
    )
}