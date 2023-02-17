import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from './actions'

const currentTimestamp = () => new Date().getTime()

export interface GlobalState{
    version? :number
}

export const initializeState:GlobalState = {
    version:1
}
export default createReducer(initializeState,(builder) => 
    builder
      .addCase(updateVersion,(state) => {
        state.version = currentTimestamp()
      })
)