import clsx from "clsx";
import { sprinkles, Sprinkles } from "./sprinkles.css";
import * as resetStyles from './reset.css'
// JSX.IntrinsicElements 是 TypeScript 中内置的类型，用于表示 HTML 元素的属性。
// 它是一个内置的映射类型，以字符串形式列出了所有 HTML 元素名称，并将它们映射到一个对象类型，对象的属性名对应 HTML 元素的名称，而属性值是对应元素的属性和它们的类型的映射。
// 这个类型通常用在 React 中，用于限制和检查组件的 props 是否与给定的 HTML 元素兼容。
export type Atoms = Sprinkles & {
    reset?: keyof JSX.IntrinsicElements
}

// 定义 atoms 函数，返回值为 className 字符串
export const atoms = ({ reset, ...rest }: Atoms) => {
    // 如果 reset 不存在，则直接返回使用 sprinkle 函数返回的 className
    if(!reset) return sprinkles(rest)
    // 如果存在 reset，则获取该元素对应的 reset 样式类
    const elementReset = resetStyles.element[reset as keyof typeof resetStyles.element]
    // 获取 sprinkle 函数返回的 className
    const sprinklesClasses = sprinkles(rest)
    // 合并样式类

    return clsx(resetStyles.base,elementReset,sprinklesClasses)
}