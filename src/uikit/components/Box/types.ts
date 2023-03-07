
import { HTMLAttributes } from 'react';
import {
    BackgroundProps, BorderProps, ColorProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps
} from 'styled-system'

// 定义 Box 组件的 props 接口，继承自 styled-system 中的样式属性和 HTMLAttributes
export interface BoxProps
    extends BackgroundProps,  // 背景色相关属性
    BorderProps, // 边框相关属性
    LayoutProps, // 布局相关属性
    PositionProps, // 定位相关属性
    SpaceProps, // 空间相关属性
    Omit<ColorProps,"color">, // 颜色相关属性（除了 color 属性）
    HTMLAttributes<HTMLElement> {} // HTML 元素属性

export interface FlexProps extends BoxProps, FlexboxProps {}