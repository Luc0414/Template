import ConnectWalletButton from "@/components/ConnectWalletButton"
import { Page } from "@/components/Layout/Page"
import { ConnectorNames } from "@/config/wallet"
import useAuth from "@/hooks/useAuth"
import useTranslation from "@/hooks/useTranslation"
import { useAppDispatch } from "@/state"
import { EN, ZHCN } from "@/translation/config/languages"
import { Trans } from "@/translation/Trans"
import Box from "@/uikit/components/Box/Box"
import { useTheme as useNextTheme } from 'next-themes'
import { useAccount, useConnect, useNetwork } from "wagmi"



const Home: React.FC<React.PropsWithChildren> = () => {
    const { address } = useAccount()
    const { setLanguage, t } = useTranslation()
    const { setTheme } = useNextTheme()
    const { login, logout } = useAuth()


    return (
        <>
            <Page />
            <h1>Test Page</h1>
            <ConnectWalletButton scale="sm">
                <Box display={['none', , , 'block']}>
                    <Trans>Connect Wallet</Trans>
                </Box>
                <Box display={['block', , , 'none']}>
                    <Trans>Connect</Trans>
                </Box>
            </ConnectWalletButton>

            <div style={{ "display": "flex", "alignContent": "center", "justifyContent": "center", "flexWrap": "wrap" }}>
                <button onClick={() => { setLanguage(ZHCN) }} style={{ "margin": "10px" }}>简体中文</button>
                <button onClick={() => { setLanguage(EN) }} style={{ "margin": "10px" }}>英语</button>
                <button onClick={() => { setTheme('dark') }} style={{ "margin": "10px" }}>Dark</button>
                <button onClick={() => { setTheme('light') }} style={{ "margin": "10px" }}>Light</button>
                <button onClick={() => { login(ConnectorNames.Injected) }} style={{ "margin": "10px" }}>Injected</button>
                <button onClick={() => { login(ConnectorNames.WalletLink) }} style={{ "margin": "10px" }}>Coinbase Wallet</button>
                <button onClick={() => { login(ConnectorNames.WalletConnect) }} style={{ "margin": "10px" }}>WalletConnect</button>
                <button onClick={() => { login(ConnectorNames.MetaMask) }} style={{ "margin": "10px" }}>Metamask</button>
                <button onClick={() => { login(ConnectorNames.Ledger) }} style={{ "margin": "10px" }}>Ledger</button>
                <button onClick={() => { logout() }} style={{ "margin": "10px" }}>Logout</button>
            </div>
            <p>{address}</p>

        </>
    )
}


export default Home