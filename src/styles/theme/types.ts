import { Tokens } from "./tokens"

// 拥有的全部样式，供var.css使用
export type Theme = {
  colors: Tokens['colors']
  fonts: Tokens['fonts']
  borderWidths: Tokens['borderWidths']
  radii: Tokens['radii']
  space: Tokens['space']
  fontSizes: Tokens['fontSizes']
  shadows: Tokens['shadows']
}


export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};
