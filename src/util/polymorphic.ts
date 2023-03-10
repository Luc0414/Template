import { ComponentProps, ElementType, ReactElement } from "react";

// 定义一个接口类型 AsProps，该类型用于定义将被传递给多态组件的 props 对象，其中包含一个 as 属性，表示组件的类型
// 之所以需要在这边定义，是为了让react能根据as的值推断出E的类型,之所以要在这里定义，是为了前面使用E的参数能顺利的推断出E的类型
// 如果不将as的参数类型设置为E，那么无法自动推断出类型，导致E一直都是butoon
export type AsProps<E extends ElementType = ElementType> ={
    as?:E
}

// 定义一个接口类型 MergeProps，该类型用于合并组件 props 中的 as 属性和其他 props
export type MergeProps<E extends ElementType> = AsProps<E> & Omit<ComponentProps<E>,keyof AsProps>


// 定义一个接口类型 PolymorphicComponentProps，该类型定义了多态组件所需的属性，其中 P 表示多态组件需要的特定属性
export type PolymorphicComponentProps<E extends ElementType,P> = P & MergeProps<E>;

// 定义一个接口类型 PolymorphicComponent，该类型定义多态组件，其中 P 表示多态组件需要的特定属性，D 表示默认组件类型为 'button'
export type PolymorphicComponent<P,D extends ElementType = 'button'> = <E extends ElementType = D>(
    props: PolymorphicComponentProps<E,P>
)=>ReactElement | null;