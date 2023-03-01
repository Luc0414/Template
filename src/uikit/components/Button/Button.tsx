import EXTERNAL_LINK_PROPS from "@/util/externalLinkProps"
import { ElementType, isValidElement, cloneElement } from "react"
import StyledButton from "./StyledButton"
import { ButtonProps, scales, variants } from "./types"

// 声明泛型的Button组件，使用 <E extends ElementType = "button"> 定义了 E 泛型类型的默认值为 button。
// 声明 props 的类型为 ButtonProps。
const Button = <E extends ElementType = "button">(props: ButtonProps): JSX.Element => {

    // 解构出 props 对象的一些属性，包括：startIcon、endIcon、external、className、isLoading、disabled 和 children 等等。
    const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props

    // 判断是否是外部链接
    const internalProps = external ? EXTERNAL_LINK_PROPS : {}

    // 按钮是否被禁用
    const isDisabled = isLoading || disabled

    // 如果传递了 className，则将其放入数组中。
    const classNames = className ? [className] : []

    if (isLoading) {
        classNames.push("button--loading");
    }

    if (isDisabled && !isLoading) {
        classNames.push("button--disabled");
    }

    // 返回由 <StyledButton> 组件包装后的内容。
    return (
        <>
            <StyledButton disabled={isDisabled} $isLoading={isLoading} {...rest}>
                {isValidElement(startIcon) &&
                    cloneElement(startIcon, {
                        // @ts-ignore
                        mr: "0.5rem",
                    })}
                {children}
                {isValidElement(endIcon) &&
                    cloneElement(endIcon, {
                        // @ts-ignore
                        mr: "0.5rem",
                    })}
            </StyledButton>
        </>
    )
}

// 定义 Button 组件的默认属性。
Button.defaultProps = {
    isLoading: false,
    external: false,
    variant: variants.PRIMARY,
    scale: scales.MD,
    disabled: false,
};

export default Button