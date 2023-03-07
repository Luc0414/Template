import { StyleRule } from '@vanilla-extract/css'
import { Breakpoint, breakpoints } from './breakpoints'

// 定义除 @media 和 @supports 以外的 CSS 属性
type CSSProps = Omit<StyleRule, '@media' | '@supports'>

// 返回对应 breakpoint 的 media query
// 接收一个Breakpoint类型的值，返回一个接收(styles?: CSSProps)的函数
const makeMediaQuery = (breakpoint: Breakpoint) => (styles?: CSSProps) =>
    // 如果没有传入 styles 参数或者它的键值对个数为 0，那么函数返回一个空对象 {}
    !styles || Object.keys(styles).length === 0
        ? {}
        : {
            // 根据 breakpoint 参数和全局变量 breakpoints 来构建一个 Media Query，然后把 styles 参数作为这个 Media Query 的 CSS 规则，返回一个对象。
            [`screen and (min-width: ${breakpoints[breakpoint]}px)`]: styles,
        }

// 定义 sm, md, lg, xl, xxl 的 media query
const mediaQuery = {
    sm: makeMediaQuery('sm'),
    md: makeMediaQuery('md'),
    lg: makeMediaQuery('lg'),
    xl: makeMediaQuery('xl'),
    xxl: makeMediaQuery('xxl'),
}

// 定义 xs, sm, md, lg, xl, xxl 的 CSS 属性
type ResponsiveStyle = {
    xs?: CSSProps
    sm?: CSSProps
    md?: CSSProps
    lg?: CSSProps
    xl?: CSSProps
    xxl?: CSSProps
}

// 生成包含响应式 CSS 样式的 StyleRule 对象
export const responsiveStyle = ({ xs, sm, md, lg, xl, xxl }: ResponsiveStyle): StyleRule => {
    // 分离 xs 样式对象的 '@media' 属性
    const { '@media': _, ...xsStyle } = (xs ?? {}) as any
    return {
        ...xsStyle,
        ...(sm || md || lg || xl ? {
            '@media': {
                ...mediaQuery.sm(sm ?? {}),
                ...mediaQuery.md(md ?? {}),
                ...mediaQuery.lg(lg ?? {}),
                ...mediaQuery.xl(xl ?? {}),
                ...mediaQuery.xxl(xxl ?? {}),
            }
        } : {})
    }
}