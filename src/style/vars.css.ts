import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";
import { Mode, tokens } from "./tokens";
import deepmerge from "deepmerge";
import { Theme } from "./types";

// 定义一个函数用于获取变量名，通过合并路径组成
const getVarName = (_value: string | null, path: string[]) => path.join("-");

// 获取主题基础 tokens
const baseTokens: Omit<Theme, "color"> = tokens;
// 创建主题基础变量
const baseVars = createGlobalThemeContract(baseTokens, getVarName);
// 将主题基础变量应用到全局 :root
createGlobalTheme(":root", baseVars, baseTokens);

// 定义一个函数用于根据主题模式生成颜色方案
const makeColorScheme = (mode: Mode = "light") => {
  const colors = tokens.colors[mode];

  return {
    colors,
  };
};

// 获取 light 模式的颜色方案
const modeTokens = makeColorScheme('light')
// 创建 light 模式的变量
export const modeVars = createGlobalThemeContract(modeTokens, getVarName)
// 将 light 模式的变量应用到全局 [data-theme="light"]
createGlobalTheme('[data-theme="light"]', modeVars, modeTokens)
// 将 dark 模式的变量应用到全局 [data-theme="dark"]
createGlobalTheme('[data-theme="dark"]', modeVars, makeColorScheme('dark'))

// 将主题基础变量和 light 模式的变量合并
type BaseVars = typeof baseVars;
type ModeVars = typeof modeVars
type Vars = BaseVars & ModeVars;

export const vars = deepmerge(baseVars, modeVars) as Vars;
