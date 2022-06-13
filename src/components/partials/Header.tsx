import { Link } from "react-router-dom";
import { StyledTopHeading } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
export const Header = () => {
  return (
    <FlexDiv
      height={"120px"}
      background={"#8b9883"}
      padding={"15px"}
      justify={"center"}
    >
      <StyledTopHeading>
        <Link to={"/"}>Lottas Zoo</Link>
      </StyledTopHeading>
    </FlexDiv>
  );
};
