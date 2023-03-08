import { atoms, Atoms } from "@/style/atoms"
import clsx, { ClassValue } from "clsx"
import { Slot } from '@radix-ui/react-slot'
import React, { ElementType } from "react"
import { sprinkles } from "@/style/sprinkles.css"

type HTMLProperties<T = HTMLElement> = Omit<
    React.AllHTMLAttributes<T>,
    'as' | 'className' | 'color' | 'height' | 'width' | 'size'>

type Props = Atoms & HTMLProperties & {
    as?: React.ElementType,
    asChild?: boolean,
    className?: ClassValue
}
export const AtomBox = React.forwardRef<HTMLElement, Props>(({as = 'div',asChild,className,...props}:Props,ref) => {

    const atomProps:Record<string,unknown> = {}
    const nativeProps:Record<string,unknown> = {}

    // 判断属性是否在sprinkles里面
    for(const key in props){
        // 判断key是否在sprinkles里面
        if(sprinkles.properties.has(key as keyof Omit<Atoms,'reset'>)){
            // 如果key在sprinkles配置里面，则将该参数添加到atomProps对象里面
            atomProps[key] = props[key as keyof typeof props]
        }else{
            // 否则加到nativeProps对面
            nativeProps[key] = props[key as keyof typeof props]
        }
    }

    // 重置as节点
    const atomicClasses = atoms({
        reset: typeof as === 'string' ? (as as Atoms['reset']) : 'div',
        ...atomProps,
      })

    const Comp = asChild ? Slot : as
    return React.createElement(Comp,{
        className: clsx(atomicClasses, className),
        ...nativeProps,
        ref,
    })
})

export type AtomBoxProps = Parameters<typeof AtomBox>[0]

AtomBox.displayName = 'AtomBox'