import { CHAIN_QUERY_NAME } from "@/config/chains"
import { WalletConnectorNotFoundError, WalletSwitchChainError } from "@/config/error"
import { ConnectorNames } from "@/config/wallet"
import { useAppDispatch } from "@/state"
import replaceBrowserHistory from "@/utils/replaceBrowserHistory"
import { useCallback } from "react"
import { ConnectorNotFoundError, SwitchChainError, SwitchChainNotSupportedError, useConnect, useDisconnect, useNetwork } from "wagmi"
import { useActiveChainId } from "./useActiveChainId"
import { useSessionChainId } from "./useSessionChainId"
import useTranslation from "./useTranslation"

const useAuth = () => {

    const dispatch = useAppDispatch()
    const { connectAsync, connectors } = useConnect()
    const { chain } = useNetwork()
    const { disconnectAsync } = useDisconnect()
    const { chainId } = useActiveChainId()
    const [, setSessionChainId] = useSessionChainId()
    const { t } = useTranslation()

    const login = useCallback(async (connectorID:ConnectorNames) => {
        const findConnector = connectors.find((c) => c.id === connectorID)
        try{
            const connected = await connectAsync({connector:findConnector,chainId})
            if(!connected.chain.unsupported && connected.chain.id !== chainId){
                replaceBrowserHistory('chain',CHAIN_QUERY_NAME[connected.chain.id])
                setSessionChainId(connected.chain.id)
            }

            return connected

        }catch(error){
            if(error instanceof ConnectorNotFoundError){
                throw new WalletConnectorNotFoundError(t('Wallet Connector Not Found'))
            }
            if (error instanceof SwitchChainNotSupportedError || error instanceof SwitchChainError) {
                throw new WalletSwitchChainError(t('Unable to switch network. Please try it on your wallet'))
              }
        }

        return undefined
     }, [connectors,connectAsync,chainId,setSessionChainId,t])

    const logout = useCallback(async () => {
        try {
            console.log(disconnectAsync)
            await disconnectAsync()
        } catch (error) {
            console.log(error)
        } finally {

        }
    }, [disconnectAsync, dispatch, chain?.id])

    return {login, logout}
}
export default useAuth