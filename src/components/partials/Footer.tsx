import { StyledHeadingh3 } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
export const Footer = () => {
  return (
    <FlexDiv
      height={"120px"}
      background={"#8b9883"}
      padding={"15px"}
      justify={"center"}
      margin={"30px 0 0 0"}
    >
      <StyledHeadingh3>&copy; Copyright 2022 Lottas djur AB</StyledHeadingh3>
    </FlexDiv>
  );
};
