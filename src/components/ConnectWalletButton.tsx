import { Trans } from "@/translation/Trans"
import Button from "@/uikit/components/Button/Button"
import { ButtonProps } from "@/uikit/components/Button/types"
import { useState } from "react"
import { WalletModalV2 } from "./Modal/WalletModal"


const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }
    return (
        <>
            <Button onClick={handleClick}{...props}>
                {children || <Trans>Connect Wallet</Trans>}
            </Button>
            <WalletModalV2 onDismiss={() => {setOpen(false)}} isOpen={open}/>

        </>
    )
}

export default ConnectWalletButton