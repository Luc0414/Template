
import { HTMLAttributes } from 'react';
import {
    BackgroundProps, BorderProps, ColorProps, LayoutProps, PositionProps, SpaceProps
} from 'styled-system'


export interface BoxProps
    extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    Omit<ColorProps,"color">,
    HTMLAttributes<HTMLElement> {}