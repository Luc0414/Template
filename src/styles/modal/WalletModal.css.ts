import { style, keyframes } from '@vanilla-extract/css'
import { responsiveStyle } from '../responsiveStyle'

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


export const desktopWalletSelectionClass = style(
  responsiveStyle({
    xs: {
      maxWidth: '100%',
    },
    sm: {
      maxWidth: '360px',
    },
    lg: {
      maxWidth: '408px',
    },
  }),
)