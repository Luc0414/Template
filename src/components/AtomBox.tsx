


type Props = Atoms &
    HTMLProperties & {
        as?: React.ElementType
        asChild?: boolean
        className?: ClassValue
    }


export const AtomBox = React.forwardRef<HTMLElement, Props>(() => {

})