import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import onErrorImg from "../assets/OnError.png";
import { StyledImage } from "./StyledComponents/Images";
import { FlexDiv } from "./StyledComponents/Wrappers";
import { IState } from "../redux/models/IState";
import { StyledLinkDiv, StyledP } from "./StyledComponents/Texts";

export const Animals = () => {
  const animals = useSelector((state: IState) => state.animals.value);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = onErrorImg;
  };

  return (
    <FlexDiv wrap={"wrap"} gap={"20px"} width={"100%"}>
      {animals.map((animal) => {
        return (
          <FlexDiv
            width={"25%"}
            height={"400px"}
            dir={"column"}
            background={"#8b9883"}
            key={animal.id}
            margin={"5px"}
            padding={"25px"}
            borderRad={"5px"}
            justify={"start"}
          >
            <Link to={`/animals/${animal.id}`}>
              <StyledImage
                onError={imageOnErrorHandler}
                src={animal.imageUrl}
                alt={animal.name}
              />
            </Link>
            <StyledLinkDiv>
              <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
            </StyledLinkDiv>
            <StyledP>{animal.shortDescription}</StyledP>
          </FlexDiv>
        );
      })}
    </FlexDiv>
  );
};
