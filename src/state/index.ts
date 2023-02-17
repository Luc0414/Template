import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { updateVersion } from "./global/actions"
import globalReducer from "./global/reducer"

const persistConfig = {
    key:"primary",
    storage,
    version:1,
    blacklist:['global']
}


const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        global: globalReducer,
    }),
)


let store: ReturnType<typeof makeStore>


export function makeStore(preloadedState = undefined){
    return configureStore({
        reducer:persistedReducer,
        middleware:(getDefaultMiddleware) => 
            getDefaultMiddleware({
                thunk:true,
                serializableCheck:{
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                }
            }),
        devTools:true,
        preloadedState,
    })
}

export const initializeStore = (preloadedState = undefined) => {
    let _store = store ?? makeStore(preloadedState)

    if (preloadedState && store) {
        _store = makeStore({
          ...store.getState(),
          ...preloadedState,
        })
        store = undefined
      }

    if (typeof window === 'undefined') return _store

    if (!store) {
        store = _store
    }

    return _store
}

store = initializeStore()

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()


export const persistor = persistStore(store, undefined, () => {
    store.dispatch(updateVersion())
  })


export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState])
  }
