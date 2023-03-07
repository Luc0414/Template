import useTranslation from "@/hooks/useTranslation";
import { AtomBox } from "@/uikit/components/AtomBox";
import Tab from "@/uikit/components/TabMenu/Tab";
import TabMenu from "@/uikit/components/TabMenu/TabMenu";
import Text from "@/uikit/components/Text/Text";
import { atom, useAtom } from "jotai";
import { PropsWithChildren, useState } from "react";
import { ModalWrapper } from "./Modal";
import { ModalV2, ModalV2Props } from "./ModalV2";
import { modalWrapperClass } from "./WalletModal.css";

const errorAtom = atom<string>('')



type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
}

export type WalletConfigV2<T = unknown> = {
    id: string,
    title: string,
    icon: string,
    connectorId: T,
    deepLink?: string,
    installed?: boolean,
    guide?: DeviceLink,
    downloadLink?: DeviceLink,
    mobileOnly?: boolean,
    qrCode?: () => Promise<string>
}
interface WalletModalV2Props<T = unknown> extends ModalV2Props {
    wallets?: WalletConfigV2<T>[]
    login?: (connectorId: T) => Promise<any>
    docLink?: string
    docText?: string
}
const selectedWalletAtom = atom<WalletConfigV2<unknown> | null>(null)

export function useSelectedWallet<T>() {
    // @ts-ignore
    return useAtom<WalletConfigV2<T> | null>(selectedWalletAtom)
}

function MobileModal<T>({
    wallets,
    connectWallet,
    docLink,
    docText, }: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & { connectWallet: (wallet: WalletConfigV2<T>) => void }) {

    const { t } = useTranslation()
    const [selected] = useSelectedWallet()
    const [error] = useAtom(errorAtom)

    const installedWallets: WalletConfigV2<T>[] = wallets.filter((w) => w.installed)
    const walletsToShow: WalletConfigV2<T>[] = wallets.filter((w) => {
        if (installedWallets.length) {
            return w.installed
        }
        return w.installed !== false || w.deepLink
    })

    return (
        <AtomBox width="full">
            {error ? (
                <AtomBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    style={{ gap: '24px' }}
                    textAlign="center"
                    p="24px"
                ></AtomBox>
            ) : (
                <Text color="textSubtle" small p="24px">
                    {t(
                        'Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.',
                    )}
                </Text>
            )
            }
        </AtomBox>
    )
}

const TabContainer = ({ children, docLink, docText }: PropsWithChildren<{ docLink: string, docText: string }>) => {
    const [index, setIndex] = useState(0);
    const { t } = useTranslation()

    return (
        <AtomBox position="relative" zIndex="modal" className={modalWrapperClass}>
            <AtomBox position="absolute" style={{ top: '-50px' }}>
                <TabMenu activeIndex={index} onItemClick={setIndex} gap="0px" isColorInverse>
                    <Tab>{t('Connect Wallet')}</Tab>
                    <Tab>{t('What’s a Web3 Wallet?')}</Tab>
                </TabMenu>
            </AtomBox>
            <AtomBox
                display="flex"
                position="relative"
                background="gradientCardHeader"
                borderRadius="card"
                borderBottomRadius={{
                    xs: '0',
                    md: 'card',
                }}
                zIndex="modal"
                width="full"
            >
                {index === 0 && children}
            </AtomBox>
        </AtomBox>
    )
}
export function WalletModalV2<T = unknown>(props: WalletModalV2Props) {
    const { wallets: _wallets, login, docLink, docText, ...rest } = props

    return (
        <ModalV2 closeOnOverlayClick {...rest}>
            <ModalWrapper onDismiss={props.onDismiss} style={{ overflow: 'visible', border: 'none' }}>
                <AtomBox position="relative">
                    <TabContainer docLink={docLink} docText={docText}>
                        <MobileModal wallets={wallets}>
                    </TabContainer>
                </AtomBox>
            </ModalWrapper>
        </ModalV2>
    )

}