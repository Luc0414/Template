import { Sprinkles, sprinkles } from './sprinkles.css'
import * as resetStyles from './reset.css'
import clsx from 'clsx'

// 继承Sprinkles类型，增加一个可选项reset
export type Atoms = Sprinkles & {
    reset?: keyof JSX.IntrinsicElements
}

// 该函数接收一个对象参数reset，reset是可选的，传入节点,rest是key及value
export const atoms = ({ reset, ...rest }: Atoms) => {

    // 如果不传入或传入的reset为假，则直接将rest传入sprinkles
    if (!reset) return sprinkles(rest)

    // 要重置的节点是否存在
    const elementReset = resetStyles.element[reset as keyof typeof resetStyles.element]
    // 获取对应的class名称
    const sprinklesClasses = sprinkles(rest)
    // 合并样式
    return clsx(resetStyles.base, elementReset, sprinklesClasses)
  }
  