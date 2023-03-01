import {ChainIdName} from "@/config/ChainIdName"
import {ConnectorNames} from "@/config/wallet"
import {useAppDispatch} from "@/state"
import {WalletConnectorNotFoundError, WalletSwitchChainError} from "@/utils/error"
import replaceBrowserHistory from "@/utils/replaceBrowserHistory"
import {useCallback, useEffect} from "react"
import {
    ConnectorNotFoundError,
    SwitchChainError,
    SwitchChainNotSupportedError,
    useConnect,
    useDisconnect,
    useNetwork,
} from 'wagmi'
import {useActiveChainId} from "./useActiveChainId"
import {useSessionChainId} from './useSessionChainId'
import useTranslation from "./useTranslation"

export const useAuth = () => {
    const dispatch = useAppDispatch()

    // 根据参数来选择链
    const {chainId} = useActiveChainId()
    const {connectAsync, connectors} = useConnect()
    const {chain} = useNetwork()
    const {disconnectAsync} = useDisconnect()
    const [, setSessionChainId] = useSessionChainId()
    const {t} = useTranslation()
    const login = useCallback(async (connectorID: ConnectorNames) => {
            // 根据ConnectorNames来选择钱包
            const findConnector = connectors.find((c) => c.id === connectorID)
            try {
                const connected = await connectAsync({connector: findConnector, chainId})
                if (!connected.chain.unsupported && connected.chain.id !== chainId) {
                    replaceBrowserHistory('chain', ChainIdName[connected.chain.id])
                    setSessionChainId(connected.chain.id)
                }
                return connected
            } catch (error) {
                if (error instanceof ConnectorNotFoundError) {
                    throw new WalletConnectorNotFoundError()
                }
                if (error instanceof SwitchChainNotSupportedError || error instanceof SwitchChainError) {
                    throw new WalletSwitchChainError(t('Unable to switch network. Please try it on your wallet'))
                }
            }
            return undefined
        },
        [connectors, connectAsync, chainId, t])

    const logout = useCallback(async () => {
        try {
            await disconnectAsync()
        } catch (error) {
            console.error(error)
        } finally {

        }
    }, [])
    return {login, logout}
}