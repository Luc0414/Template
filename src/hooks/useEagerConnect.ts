import { ConnectorNames } from '@/config/wallet'
import { MiniProgramConnector } from '@/utils/connectors/MiniProgram'
import { chains } from '@/utils/wagmi'
import { useCallback } from 'react'
import { useConnect } from 'wagmi'

const onCallbackIdList = {}

const prefix = Math.random() * 1000
const cbList = {}

let id = 0
const postMessage = ({ action, payload, cb }: { action: string; payload?: any; cb?: (payload?: any) => void }) => {
    const finalId = `${prefix}-${id}`
    window.bn.miniProgram.postMessage({ action, id: finalId, payload })
    cbList[finalId] = cb
    id++
    return finalId
}

function getWeb3Provider() {
    return {
        on(event: string, cb: () => void) {
            postMessage({ action: 'on', payload: { event } })
            onCallbackIdList[event] = cb
        },
        request(params) {
            return new Promise((resolve, reject) => {
                postMessage({
                    action: 'request',
                    payload: params,
                    cb: (payload) => {
                        if (payload?.error) {
                            reject(payload?.message)
                        } else {
                            resolve(payload)
                        }
                    },
                })
            })
        },
        removeEventListener(event: string) {
            if (onCallbackIdList[event]) {
                onCallbackIdList[event] = undefined
            }
        },
    }
}

const injected = new MiniProgramConnector({ chains, getWeb3Provider })

const useActive = () => {
    const { connectAsync, connectors } = useConnect()
    return useCallback(
        () => {
            connectAsync({ connector: injected }).catch((error)=>{
                console.log(error)
            })
        },
        [connectAsync]
    )
}

export const useActiveHandle = () => {

}

export default useActive
export { useActive }