import { useIsomorphicEffect } from "@/hooks/useIsomorphicEffect";
import { breakpoints } from "@/styles/theme/breakpoints";
import { createContext, useState } from "react";


type State = {
    [key: string]: boolean;
};

type MediaQueries = {
    [key: string]: string;
};

export type BreakpointChecks = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
} & State;


// 定义一个函数返回媒体查询字符串
const mediaQueries: MediaQueries = (() => {
    // 初始化最小宽度
    let prevMinWidth = 0;
    // 遍历 breakpoints 对象，生成媒体查询字符串
    return Object.keys(breakpoints).reduce((accum, size, index) => {
        // 对于最后一个 breakpoint，只需定义最小宽度即可
        if (index === Object.keys(breakpoints).length - 1) {
            return { ...accum, [size]: `(min-width: ${prevMinWidth}px)` };
        }
        // 定义最小宽度和当前 breakpoint
        const minWidth = prevMinWidth;
        // @ts-ignore
        const breakpoint = breakpoints[size];
        // 更新最小宽度为当前 breakpoint
        prevMinWidth = breakpoint;
        // 返回带有媒体查询字符串的对象
        return { ...accum, [size]: `(min-width: ${minWidth}px) and (max-width: ${breakpoint - 1}px)` };
    }, {});
})();

// 将一个字符串大小写转换并且拼接出一个新的字符串
const getKey = (size: string) => `is${size.charAt(0).toUpperCase()}${size.slice(1)}`;

// getState 函数的作用是根据媒体查询列表中定义的尺寸范围，返回一个布尔值对象，用来表示这些媒体查询是否匹配当前设备的尺寸。
const getState = (): State => {
    // 定义一个名为 s 的对象，初始值为空对象
    const s = Object.keys(mediaQueries).reduce((accum, size) => {
        // 对于媒体查询列表中定义的每个尺寸，调用 getKey 函数获取相应的布尔值属性名称
        // 返回 isXs这些
        const key = getKey(size);
        // 如果当前代码在服务器端执行，直接将该属性设为 false
        if (typeof window === "undefined") {
            return {
                ...accum,
                [key]: false,
            };
        }
        // 否则，在客户端中使用 window.matchMedia 方法来检查媒体查询是否匹配当前设备的尺寸
        // window.matchMedia("(min-width: 576px) and (max-width: 851px)")
        const mql = typeof window?.matchMedia === "function" ? window.matchMedia(mediaQueries[size]) : null;
        return { ...accum, [key]: mql?.matches ?? false };
    }, {});
    return s;
};

export const MatchBreakpointsContext = createContext<BreakpointChecks>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
});

/**
 *接收一个状态对象并返回一个BreakpointChecks对象。
 * @param state - 要转换的状态对象。
 * @returns 代表当前设备状态的BreakpointChecks对象。
 */
export const getBreakpointChecks = (state: State): BreakpointChecks => {
    return {
        ...state,
        isMobile: state.isXs || state.isSm,
        isTablet: state.isMd || state.isLg,
        isDesktop: state.isXl || state.isXxl,
    };
};

/**
 * MatchBreakpointsProvider组件是一个上下文提供者，使用React Hooks来管理设备状态。
 * 它在MatchBreakpointsContext.Provider中包装它的子组件，并向它们提供当前的设备状态。
 * @param children - 将从提供者那里接收设备状态的子组件。
 * @returns 提供设备状态的MatchBreakpointsProvider组件。
 */
export const MatchBreakpointsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    // 定义 state 状态
    const [state, setState] = useState<BreakpointChecks>(() => getBreakpointChecks(getState()))
    // 监听窗口尺寸变化
    useIsomorphicEffect(() => {

        // 存储所有的事件句柄
        const handlers = Object.keys(MediaQueryList).map((size) => {
            let mql: MediaQueryList
            let handler: (matchMediaQuery: MediaQueryListEvent) => void

            if (typeof window?.matchMedia === 'function') {
                mql = window.matchMedia(mediaQueries[size])
                // 定义事件处理函数，当媒体查询匹配状态变化时会调用
                handler = (matchMediaQuery: MediaQueryListEvent) => {
                    const key = getKey(size);

                    setState((prevState) => getBreakpointChecks({ ...prevState, [key]: matchMediaQuery.matches }))

                }
                // 添加事件监听
                if (mql.addEventListener) mql.addEventListener('change', handler)
            }
            // 返回事件句柄清除函数
            return () => { if (mql?.removeEventListener) mql.removeEventListener("change", handler); }
        })

        // 初始时调用一次，设置当前窗口尺寸状态
        setState(getBreakpointChecks(getState()))

        // 组件销毁时清除所有事件监听
        return () => {
            handlers.forEach((unsubscribe) => { unsubscribe(); })
        }
    }, [])
    // 提供窗口尺寸状态给子组件
    return <MatchBreakpointsContext.Provider value={state}>{children}</MatchBreakpointsContext.Provider>
}