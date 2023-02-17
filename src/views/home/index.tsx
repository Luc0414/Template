import ConnectWalletButton from '@/components/ConnectWalletButton'
import TestButton from '@/components/TestButton.tes'
import { useAccount } from 'wagmi'

const Home:React.FC<React.PropsWithChildren> = () => {
    const {address: account} = useAccount()
    return (
        <>
            <h1>Index Page</h1>
            <ConnectWalletButton />
            <TestButton />
            <p>{account}</p>
        </>
    )
}
export default Home