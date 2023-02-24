import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import user from './user/reducer'
import { useDispatch } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { updateVersion } from "./global/actions";

// 在状态中需要持久化的key
const PERSISTED_KEYS: string[] = ['user', 'transactions']

// 配置持久化存储
const persistConfig = {
    key: "primary",
    storage,
    whitelist: PERSISTED_KEYS, // 只持久化名为 PERSISTED_KEYS 的状态
    version: 1,// 版本号
}


// 将多个 reducer 合并成一个 reducer
const persistedReducer = persistReducer(persistConfig, combineReducers({
    user
}))

let store: ReturnType<typeof makeStore>

// 创建 store
export function makeStore(preloadedState = undefined) {
    return configureStore({
        reducer: persistedReducer,
        middleware: ((getDefaultMiddleware) => getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })

        ),
        devTools: process.env.NODE_ENV === 'development',
        preloadedState

    })

}

// 初始化 store
export const initializeStore = (preloadedState = undefined) => {

    let _store = store ?? makeStore(preloadedState)

    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState
        })

        store = undefined
    }

    // 如果不是浏览器环境则返回 _store
    if (typeof window === undefined) return _store

    if (!store) {
        store = _store
    }
    return _store
}

store = initializeStore()

export type AppDispatch = typeof store.dispatch

export type AppState = ReturnType<typeof store.getState>

// 用于在组件中获取 dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

// 创建一个持久化存储器
export const persistor = persistStore(store, undefined, () => {
    store.dispatch(updateVersion()) // 更新版本号
})

// 用于创建一个新的 store 实例，用于服务端渲染和客户端渲染
export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState])
}