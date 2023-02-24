import { INITIAL_ALLOWED_SLIPPAGE } from "@/config/constants"
import { createReducer } from "@reduxjs/toolkit"
import { updateVersion } from "../global/actions"

const currentTimestamp = () => new Date().getTime()

export interface UserState {
    userSlippageTolerance: number,
    lastUpdateVersionTimestamp?: number
}

export const initialState: UserState = {
    userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
}
export default createReducer(initialState, (builder) => builder
    .addCase(updateVersion, (state) => {
        if (typeof state.userSlippageTolerance !== 'number') {
            state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
        }
        state.lastUpdateVersionTimestamp = currentTimestamp()
    })
)