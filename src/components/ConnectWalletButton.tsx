import { createWallets } from "@/config/wallet"
import { useActiveChainId } from "@/hooks/useActiveChainId"
import { useAuth } from "@/hooks/useAuth"
import { useActive, useActiveHandle } from "@/hooks/useEagerConnect"
import useTranslation from "@/hooks/useTranslation"
import { useMemo, useState } from "react"
import { useConnect } from "wagmi"
import { WalletModalV2 } from "./modal/WalletModal"

const ConnectWalletButton = () => {
    const handleActive = useActiveHandle()
    const { login, logout } = useAuth()
    const { t } = useTranslation()
    const handleConnect = useActive()

    const [open, setOpen] = useState(false)

    const { connectAsync } = useConnect()

    const { chainId } = useActiveChainId()


    const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

    const handleCilck = () => {
        setOpen(true)
    }
    return (
        <>
            <button onClick={handleCilck}>连接钱包</button>
            <WalletModalV2
                docText={t('Learn How to Connect')}
                isOpen={open}
                wallets={wallets}
                login={login}
            />

        </>


    )
}

export default ConnectWalletButton