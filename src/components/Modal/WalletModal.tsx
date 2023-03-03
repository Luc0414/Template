import { ModalV2, ModalV2Props } from "./ModalV2";

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
  }

export type WalletConfigV2<T = unknown> = {
    id:string,
    title:string,
    icon:string,
    connectorId: T,
    deepLink?:string,
    installed?:boolean,
    guide?:DeviceLink,
    downloadLink?:DeviceLink,
    mobileOnly?: boolean,
    qrCode?: () => Promise<string>
}
interface WalletModalV2Props<T = unknown> extends ModalV2Props{
    wallets?:WalletConfigV2<T>[]
    login?: (connectorId: T) => Promise<any>
    docLink?: string
    docText?: string
}
export function WalletModalV2<T=unknown>(props:WalletModalV2Props){
    const { wallets: _wallets, login, docLink, docText, ...rest } = props

    return (
        <ModalV2 closeOnOverlayClick {...rest}>

        </ModalV2>
    )

}