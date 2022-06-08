import { Animals } from "../Animals";
import { StyledHeading } from "../StyledComponents/Headings";
import { StyledWrapper } from "../StyledComponents/Wrappers";
export const Home = () => {
  return (
    <>
      <StyledWrapper>
        <StyledHeading>Våra djur</StyledHeading>
        <Animals />
      </StyledWrapper>
    </>
  );
};
