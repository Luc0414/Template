import { calc } from "@vanilla-extract/css-utils"
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles"
import { breakpoints } from "./breakpoints"
import { vars } from "./vars.css"

const flexAlignment = ['flex-start', 'center', 'start', 'flex-end', 'stretch'] as const

const negativeSpace = {
    '-1px': `${calc(vars.space['1px']).negate()}`,
    '-1': `${calc(vars.space['1']).negate()}`,
    '-2': `${calc(vars.space['2']).negate()}`,
    '-3': `${calc(vars.space['3']).negate()}`,
    '-4': `${calc(vars.space['4']).negate()}`,
    '-5': `${calc(vars.space['5']).negate()}`,
    '-6': `${calc(vars.space['6']).negate()}`,
    '-7': `${calc(vars.space['7']).negate()}`,
  }
  

const extendedSpace = {
    '100%': '100%',
    full: '100%',
    auto: 'auto',
    fit: 'fit-content',
    screenSm: breakpoints.sm,
    screenMd: breakpoints.md,
    screenLg: breakpoints.lg,
    screenXl: breakpoints.xl,
  } as const
  
// 响应的属性
const responsiveProperties = defineProperties({
    // 为提供的属性定义一组媒体/特征/容器查询。
    // 例如，属性可以被范围化为媒体查询。
    conditions: {
        xs: {},
        sm: { '@media': `(min-width: ${breakpoints.sm}px)` },
        md: { '@media': `(min-width: ${breakpoints.md}px)` },
        lg: { '@media': `(min-width: ${breakpoints.lg}px)` },
        xl: { '@media': `(min-width: ${breakpoints.xl}px)` },
        xxl: { '@media': `(min-width: ${breakpoints.xxl}px)` },
    },
    defaultCondition: 'xs',
    // 提供条件名称数组可以通过定义条件的顺序启用响应式数组表示法
    responsiveArray: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    //定义哪些CSS属性和值应该是可用的。
    // 对于简单的映射（即有效的CSS值），值可以以数组的形式提供。
    properties: {
        padding: { ...vars.space, ...negativeSpace },
        textAlign: ['center', 'left', 'right'],
        alignItems: ['center', 'end', 'baseLine', 'inherit', ...flexAlignment],
        flexDirection: ['column', 'row', 'column-reverse'],
        display: ['block', 'flex', 'grid', 'inline', 'inline-flex', 'inline-block', 'none', 'contents'],
        position: ['absolute', 'fixed', 'relative', 'sticky'],
        zIndex: {
            '0': 0,
            '1': 1,
            ribbon: 9,
            dropdown: 10,
            '10': 10,
            '20': 20,
            '30': 30,
            '40': 40,
            '50': 50,
            '75': 75,
            '99': 99,
            '100': 100,
            modal: 100,
            auto: 'auto',
        },
        borderRadius: vars.radii,
        borderTopLeftRadius: vars.radii,
        borderBottomRightRadius: vars.radii,
        borderTopRightRadius: vars.radii,
        borderBottomLeftRadius: vars.radii,
        width: {
            ...vars.space,
            ...extendedSpace,
          },
    },
    // 将自定义的速记属性映射到多个底层CSS属性。
    shorthands: {
        borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
        p: ['padding'],
    }

})

// 无响应的属性
const unresponsiveProperties = defineProperties({

    properties: {

    }
})


// 互动属性
const interactiveProperties = defineProperties({

    properties: {
        background: vars.colors,
    }
})

export const sprinkles = createSprinkles(responsiveProperties, unresponsiveProperties, interactiveProperties)
// Parameters 是 TypeScript 内置的一个类型，用于获取函数类型的参数类型数组。
export type Sprinkles = Parameters<typeof sprinkles>[0]