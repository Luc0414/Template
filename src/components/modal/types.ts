import { BoxProps } from "../Box/types";

export type Handler = () => void;


export interface InjectedProps {
  onDismiss?: Handler;
  mode?: string;
}



export interface ModalWrapperProps extends InjectedProps, Omit<BoxProps, "title"> {
  hideCloseButton?: boolean;
}

export interface ModalProps extends ModalWrapperProps {
  title: React.ReactNode;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
}
