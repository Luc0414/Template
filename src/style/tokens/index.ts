import { darkColors, lightColors } from "./colors";


export const tokens = {
    colors: {
        light:lightColors,
        dark:darkColors
    }
}

export type Mode = 'light' | 'dark'
export type Tokens = typeof tokens

