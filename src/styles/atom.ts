import { Sprinkles, sprinkles } from './sprinkles.css'
import * as resetStyles from './reset.css'
import clsx from 'clsx'

// 继承Sprinkles类型，增加一个可选项reset
export type Atoms = Sprinkles & {
    reset?: keyof JSX.IntrinsicElements
}

// 该函数接收一个对象参数reset，reset是可选的
export const atoms = ({ reset, ...rest }: Atoms) => {

    // 如果不传入或传入的reset为假，则直接将rest传入sprinkles
    if (!reset) return sprinkles(rest)
  
    const elementReset = resetStyles.element[reset as keyof typeof resetStyles.element]
  
    const sprinklesClasses = sprinkles(rest)
  
    return clsx(resetStyles.base, elementReset, sprinklesClasses)
  }
  