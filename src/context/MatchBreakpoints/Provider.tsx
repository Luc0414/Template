import { useIsomorphicEffect } from "@/hooks/useIsomorphicEffect";
import { breakpoints } from "@/style/breakpoints";
import { createContext, useState } from "react";


type MediaQueries = {
    [key: string]: string;
};


// 媒体查询，根据不同屏幕尺寸定义不同样式
const mediaQueries: MediaQueries = (() => {
    let prevMinWidth = 0;

    return Object.keys(breakpoints).reduce((accum, size, index) => {

        // 如果是最后一个尺寸，只需要设置最小宽度
        if (index === Object.keys(breakpoints).length - 1) {
            return { ...accum, [size]: `(min-width: ${prevMinWidth}px)` };
        }

        const minWidth = prevMinWidth;
        // @ts-ignore
        const breakpoint = breakpoints[size];

        // 下一个尺寸的最小宽度
        prevMinWidth = breakpoint;

        return { ...accum, [size]: `(min-width: ${minWidth}px) and (max-width: ${breakpoint - 1}px)` };
    }, {});
})();

type State = {
    [key: string]: boolean;
};

export type BreakpointChecks = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
} & State;

const getKey = (size: string) => `is${size.charAt(0).toUpperCase()}${size.slice(1)}`;

// 获取默认的状态
const getState = (): State => {
    // 遍历媒体查询对象的键值
    const s = Object.keys(mediaQueries).reduce((accum, size) => {
        // 获取键
        const key = getKey(size);
        // 如果是在服务器端，设置状态为 false
        if (typeof window === "undefined") {
            return {
                ...accum,
                [key]: false,
            };
        }
        // 在客户端时，使用 matchMedia() API 获取媒体查询对象的 matches 属性
        const mql = typeof window?.matchMedia === "function" ? window.matchMedia(mediaQueries[size]) : null;
        // 将键和匹配结果添加到 accum 对象中
        return { ...accum, [key]: mql?.matches ?? false };
    }, {});
    // 返回状态
    return s;
};

export const MatchBreakpointsContext = createContext<BreakpointChecks>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
});

export const getBreakpointChecks = (state: State): BreakpointChecks => {
    return {
        ...state,
        isMobile: state.isXs || state.isSm,
        isTablet: state.isMd || state.isLg,
        isDesktop: state.isXl || state.isXxl,
    };
};

export const MatchBreakpointsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    // 初始化state为当前窗口宽度对应的断点状态
    const [state, setState] = useState<BreakpointChecks>(() => getBreakpointChecks(getState()))

    // 在componentDidMount和componentWillUnmount的时候注册和移除监听器
    useIsomorphicEffect(() => {

        // 创建媒体查询事件处理程序的函数数组
        const handlers = Object.keys(mediaQueries).map((size) => {
            let mql: MediaQueryList;
            let handler: (matchMediaQuery: MediaQueryListEvent) => void
            // 判断浏览器是否支持matchMedia方法
            if (typeof window?.matchMedia === "function") {

                 // 通过mediaQueries生成媒体查询列表
                mql = window.matchMedia(mediaQueries[size]);

                // 定义处理事件的函数
                handler = (matchMediaQuery: MediaQueryListEvent) => {
                    const key = getKey(size)
                    // 更新状态state
                    setState((prevState) => getBreakpointChecks({ ...prevState, [key]: matchMediaQuery.matches }))
                }
                // 添加媒体查询事件监听器
                if (mql.addEventListener) {
                    mql.addEventListener("change", handler)
                }
            }
            // 返回移除媒体查询事件监听器的函数
            return () => {
                if (mql?.removeEventListener) {
                    mql.removeEventListener("change", handler);
                }
            }
        });
        // 手动更新状态state
        setState(getBreakpointChecks(getState()))
        // 在组件销毁时，移除所有事件监听器
        return () => {
            handlers.forEach((unsubscribe) => {
                unsubscribe();
            })
        }

    }, [])
     // 将state传递给MatchBreakpointsContext.Provider组件
    return <MatchBreakpointsContext.Provider value={state}>{children}</MatchBreakpointsContext.Provider>
}