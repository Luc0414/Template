import {ModalContainer} from "@/components/modal/styles";
import useMatchBreakpoints from "@/hooks/useMatchBreakpoints";
import {useRef} from "react";


export const ModalWrapper = ({children, onDismiss, minWidth, hideCloseButton, ...props}) => {
    const {isMobile} = useMatchBreakpoints();
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
        <ModalContainer $minWidth={minWidth}>

        </ModalContainer>
    )

}