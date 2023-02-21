import { atoms, Atoms } from "@/styles/atom"
import clsx, { ClassValue } from 'clsx'
import React from "react"
import { Slot } from '@radix-ui/react-slot'
import { sprinkles } from "@/styles/sprinkles.css"

// Html元素，定义一个Html所有可能的属性，排除'as' | 'className' | 'color' | 'height' | 'width' | 'size'
type HTMLProperties<T = HTMLElement> = Omit<
    React.AllHTMLAttributes<T>,
    'as' | 'className' | 'color' | 'height' | 'width' | 'size'
>


type Props = Atoms &
    HTMLProperties & {
        as?: React.ElementType
        asChild?: boolean
        className?: ClassValue
    }


export const AtomBox = React.forwardRef<HTMLElement, Props>(({ as = 'div', asChild, className, ...props }: Props, ref) => {
    // 如果加入的属性存在sprinkles则加入，否则加入nativeProps参数
    const atomProps: Record<string, unknown> = {}
    const nativeProps: Record<string, unknown> = {}
    // 判断sprinkles是否存在该属性
    for (const key in props) {
        // 判断key是否在sprinkles的可选参数上
        if (sprinkles.properties.has(key as keyof Omit<Atoms, 'reset'>)) {
            atomProps[key] = props[key as keyof typeof props]
        } else {
            nativeProps[key] = props[key as keyof typeof props]
        }
    }

    // 返回合并之后的样式
    const atomicClasses = atoms({
        // 要重置的标签
        reset: typeof as === 'string' ? (as as Atoms['reset']) : 'div',
        // 要重置的属性
        ...atomProps,
    })
    const Comp = asChild ? Slot : as
    // 创建新节点，
    return React.createElement(Comp, {
        className: clsx(atomicClasses, className),
        ...nativeProps,
        ref,
      })
})


export type AtomBoxProps = Parameters<typeof AtomBox>[0]

AtomBox.displayName = 'AtomBox'