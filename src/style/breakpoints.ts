export const breakpoints = {
    xs: 370,
    sm: 576,
    md: 852,
    lg: 968,
    xl: 1080,
    xxl: 1200,
} as const

export const mediaQueries = {
    xs: ``,
    sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
    md: `@media screen and (min-width: ${breakpoints.md}px)`,
    lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
    xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
    xxl: `@media screen and (min-width: ${breakpoints.xxl}px)`,
}

// 定义Breakpoint类型为breakpoints的key类型
export type Breakpoint = keyof typeof breakpoints

// 获取所有breakpoint的名称，作为Breakpoint类型的数组
export const breakpointNames = Object.keys(breakpoints) as Breakpoint[]
