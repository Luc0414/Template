import Box from "../Box/Box";
import { BoxProps } from "../Box/types";


const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
    return (
        <Box px={['16px', '24px']} mx='auto' maxWidth="1200px" {...props}>
            {children}
        </Box>
    )
}

export default Container