import Box from "../Box/Box";
import { BoxProps } from "../Box/types";

// 定义一个容器组件，继承 BoxProps 属性，支持 Box 组件的所有属性
const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
    return (
        <Box px={['16px', '24px']} mx='auto' maxWidth="1200px" {...props}>
            {children}
        </Box>
    )
}

export default Container