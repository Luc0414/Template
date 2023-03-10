import { PolymorphicComponentProps } from "@/util/polymorphic";
import { ElementType, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";

// 可选的按钮大小
export const scales = {
    MD: "md",
    SM: "sm",
    XS: "xs",
} as const;



// 可选的按钮样式
export const variants = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    TERTIARY: "tertiary",
    TEXT: "text",
    DANGER: "danger",
    SUBTLE: "subtle",
    SUCCESS: "success",
    LIGHT: "light",
    BUBBLEGUM: "bubblegum",
} as const;

// 定义类型别名，描述可选的按钮大小和样式
export type Scale = (typeof scales)[keyof typeof scales];
export type Variant = (typeof variants)[keyof typeof variants];

// 基本的按钮属性
export interface BaseButtonProps extends LayoutProps, SpaceProps {
    as?: "a" | "button" | ElementType; // 按钮的 HTML 元素类型
    external?: boolean; // 是否为外部链接
    isLoading?: boolean; // 是否为加载中状态
    scale?: Scale; // 按钮的大小
    variant?: Variant; // 按钮的样式
    disabled?: boolean; // 是否为禁用状态
    startIcon?: ReactNode; // 按钮左侧的图标
    endIcon?: ReactNode; // 按钮右侧的图标
    decorator?: { // 按钮的修饰，用于添加背景色和文本
        backgroundColor?: string;
        color?: string;
        text: string;
        direction?: "left" | "right";
    };
}
// 定义一个泛型类型，用于描述多态组件的属性
export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>
