import { StyledHeadingh3 } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
export const Footer = () => {
  return (
    <FlexDiv
      height={"120px"}
      background={"#8b9883"}
      justify={"center"}
      margin={"30px 0 0 0"}
      width={"100%"}
    >
      <StyledHeadingh3>&copy; Copyright 2022 Lottas Zoo AB</StyledHeadingh3>
    </FlexDiv>
  );
};
