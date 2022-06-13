import { StyledHeadingh3 } from "../StyledComponents/Texts";
import { StyledP } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
export const About = () => {
  return (
    <FlexDiv dir='column' height='90vh' justify='start' width='80%'>
      <StyledHeadingh3>Om oss</StyledHeadingh3>
      <StyledP>
        Hej och välkomna till Lottas Zoo! Här finns en fin liten blandning med
        djur som alla är välkomna att hjälpas åt att mata. Alla djur behöver mat
        var tredje timme.
      </StyledP>
    </FlexDiv>
  );
};
