import { useIsomorphicEffect } from "@/hooks/useIsomorphicEffect";
import {breakpoints} from "@/styles/theme/breakpoints";
import {createContext, useState} from "react";


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

const mediaQueries: MediaQueries = (() => {
    let prevMinWidth = 0;

    return Object.keys(breakpoints).reduce((accum, size, index) => {
        // Largest size is just a min-width of second highest max-width
        if (index === Object.keys(breakpoints).length - 1) {
            return {...accum, [size]: `(min-width: ${prevMinWidth}px)`};
        }

        const minWidth = prevMinWidth;
        // @ts-ignore
        const breakpoint = breakpoints[size];

        // Min width for next iteration
        prevMinWidth = breakpoint;

        return {...accum, [size]: `(min-width: ${minWidth}px) and (max-width: ${breakpoint - 1}px)`};
    }, {});
})();


const getKey = (size: string) => `is${size.charAt(0).toUpperCase()}${size.slice(1)}`;


const getState = (): State => {
    const s = Object.keys(mediaQueries).reduce((accum, size) => {
        const key = getKey(size);
        if (typeof window === "undefined") {
            return {
                ...accum,
                [key]: false,
            };
        }

        const mql = typeof window?.matchMedia === "function" ? window.matchMedia(mediaQueries[size]) : null;
        return {...accum, [key]: mql?.matches ?? false};
    }, {});
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


export const MatchBreakpointsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [state, setState] = useState<BreakpointChecks>(() => getBreakpointChecks(getState()))

    useIsomorphicEffect(()=> {
        const handlers = Object.keys(mediaQueries).map((size) => {
            let mql:MediaQueryList
            let handler: (matchMediaQuery: MediaQueryListEvent) => void;

            if (typeof window?.matchMedia === "function"){
                mql = window.matchMedia(mediaQueries[size]);
                handler = (matchMediaQuery: MediaQueryListEvent) => {
                    const key = getKey(size);
                    setState((prevState) => getBreakpointChecks({...prevState,[key]: matchMediaQuery.matches}))
                }
            }
                })
    },[])
    return <MatchBreakpointsContext.Provider value={state}>{children}</MatchBreakpointsContext.Provider>
}