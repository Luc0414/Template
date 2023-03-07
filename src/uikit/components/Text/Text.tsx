import getThemeValue from "@/util/getThemeValue";
import styled, { DefaultTheme } from "styled-components";
import { TextProps } from "./types";
import { space, typography, layout } from "styled-system";

interface ThemedProps extends TextProps {
    theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
    return getThemeValue(theme, `colors.${color}`, color);
};


const Text = styled.div<TextProps>`
    color: ${getColor};
    font-weight: ${({ bold }) => (bold ? 600 : 400)};
    line-height: 1.5;
    ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
    ${({ ellipsis }) =>
        ellipsis &&
        `white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;`}
  
    ${space}
    ${typography}
    ${layout}
  
    ${({ small }) => small && `font-size: 14px;`}
`

Text.defaultProps = {
    color: "text",
    small: false,
    fontSize: "16px",
    ellipsis: false,
};

export default Text;