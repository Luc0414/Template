import { atoms } from "@/style/atoms";
import { responsiveStyle } from "@/style/responsiveStyle";
import { keyframes, style } from "@vanilla-extract/css";

export const modalWrapperClass = style([
    style({
        display: 'flex',
    }),
    responsiveStyle({
        xs: {
            width: '100%',
            marginBottom: 0,
        },
        md: {
            height: '490px',
        },
        lg: {
            width: '792px',
        },
    }),
])

export const walletSelectWrapperClass = style(
    responsiveStyle({
        xs: {
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            rowGap: '10px',
            columnGap: '8px',
        },
        sm: {
            rowGap: '24px',
            columnGap: '16px',
            gridTemplateColumns: '1fr 1fr',
        },
        lg: {
            gridTemplateColumns: '1fr 1fr 1fr',
        },
    }),
)


export const walletIconClass = style({
    width: '50px',
    height: '50px',
    borderRadius: '12px',
})

const promotedGradientKf = keyframes({
    '0%': {
      backgroundPosition: '50% 0%',
    },
    '50%': {
      backgroundPosition: '50% 100%',
    },
    '100%': {
      backgroundPosition: '50% 0%',
    },
  })

export const promotedGradientClass = style([
    atoms({
        background: 'gradientBold',
    }),
    style({
        animation: `${promotedGradientKf} 3s ease infinite`,
        backgroundSize: '400% 400%',
    }),
])