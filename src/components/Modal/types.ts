import { BoxProps } from "@/uikit/components/Box/types";

export interface ModalTheme {
    background: string;
}

export type Handler = () => void;

export interface InjectedProps {
    onDismiss?: Handler;
    mode?: string;
}


export interface ModalWrapperProps extends InjectedProps, Omit<BoxProps, "title"> {
    hideCloseButton?: boolean;
}