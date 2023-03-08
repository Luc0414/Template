import { createWallets } from "@/config/wallet"
import { useActiveChainId } from "@/hooks/useActiveChainId"
import { Trans } from "@/translation/Trans"
import Button from "@/uikit/components/Button/Button"
import { ButtonProps } from "@/uikit/components/Button/types"
import { useMemo, useState } from "react"
import { useConnect } from "wagmi"
import { WalletModalV2 } from "./Modal/WalletModal"


const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {

    const [open, setOpen] = useState(false)
    const { chainId } = useActiveChainId()
    const { connectAsync } = useConnect()
    const handleClick = () => {
        setOpen(true)
    }

    const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])
    
    return (
        <>
            <Button onClick={handleClick}{...props}>
                {children || <Trans>Connect Wallet</Trans>}
            </Button>
            <WalletModalV2 onDismiss={() => {setOpen(false)}} isOpen={open} wallets={wallets}/>
        </>
    )
}

export default ConnectWalletButton