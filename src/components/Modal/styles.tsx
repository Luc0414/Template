import { MotionBox } from "@/uikit/components/Box/Box";
import styled from "styled-components";


export const ModalContainer = styled(MotionBox) <{ $minWidth: string }>`
    overflow: hidden;
    background:${({ theme }) => theme.modal.background}
    box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 32px 32px 0px 0px;
    width: 100%;
    max-height: calc(var(--vh, 1vh) * 100);
    z-index: ${({ theme }) => theme.zIndices.modal};
    position: absolute;
    min-width: ${({ $minWidth }) => $minWidth};
    bottom: 0;
    max-width: none !important;
    min-height: 300px;

    ${({ theme }) => theme.mediaQueries.md}{
        width: auto;
        position: auto;
        bottom: auto;
        border-radius: 32px;
        max-height: 100vh;
    }
`