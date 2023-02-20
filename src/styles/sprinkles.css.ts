import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { calc } from '@vanilla-extract/css-utils'


export const sprinkles = createSprinkles(responsiveProperties, unresponsiveProperties, interactiveProperties)
export type Sprinkles = Parameters<typeof sprinkles>[0]
