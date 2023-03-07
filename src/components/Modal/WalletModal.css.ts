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