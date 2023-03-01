import { Trans } from "@/translation/Trans"
import Button from "@/uikit/components/Button/Button"
import { ButtonProps } from "@/uikit/components/Button/types"


const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
    return (
        <>
            <Button {...props}>
                {children || <Trans>Connect Wallet</Trans>}
            </Button>
        </>
    )
}

export default ConnectWalletButton