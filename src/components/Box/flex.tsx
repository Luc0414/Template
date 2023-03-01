import styled from "styled-components";
import { flexbox } from "styled-system";
import Box from "./box";
import { FlexProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export default Flex;
