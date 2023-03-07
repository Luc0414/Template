import { Tokens } from "./tokens";

// 该Theme包含的是样式的类型
export type Theme = {
    colors: Tokens["colors"];
    radii: Tokens['radii'];
    space: Tokens['space'];
};

