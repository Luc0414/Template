import { atoms, Atoms } from "@/styles/atom"
import clsx, { ClassValue } from 'clsx'
import React from "react"
import { Slot } from "@radix-ui/react-slot"
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
    const atomProps: Record<string, unknown> = {}
    const nativeProps: Record<string, unknown> = {}

    console.log(sprinkles.properties)
    for (const key in props) {
        if (sprinkles.properties.has(key as keyof Omit<Atoms, 'reset'>)) {
            atomProps[key] = props[key as keyof typeof props]
        } else {
            nativeProps[key] = props[key as keyof typeof props]
        }
    }

    const atomicClasses = atoms({
        reset: typeof as === 'string' ? (as as Atoms['reset']) : 'div',
        ...atomProps,
    })

    const Comp = asChild ? Slot : as

    return React.createElement(Comp, {
        className: clsx(atomicClasses, className),
        ...nativeProps,
        ref,
      })
})


export type AtomBoxProps = Parameters<typeof AtomBox>[0]

AtomBox.displayName = 'AtomBox'