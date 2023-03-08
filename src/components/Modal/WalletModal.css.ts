import { responsiveStyle } from "@/style/responsiveStyle";
import { style } from "@vanilla-extract/css";

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