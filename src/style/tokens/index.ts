import { darkColors, lightColors } from "./colors";


export const tokens = {
    colors: {
        light:lightColors,
        dark:darkColors
    },
    radii: {
        '0': '0px',
        '8px': '8px',
        '12px': '12px',
        '20px': '20px',
        small: '4px',
        default: '16px',
        card: '24px',
        circle: '50%',
      },
      space: {
        '0': '0px',
        '0px': '0px',
        '1rem': '1rem',
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
        '7': '64px',
        '1px': '1px',
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '20px': '20px',
        '24px': '24px',
        '32px': '32px',
        '48px': '48px',
        '56px': '56px',
        '64px': '64px',
      },
}

export type Mode = 'light' | 'dark'
export type Tokens = typeof tokens

