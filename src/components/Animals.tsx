import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import onErrorImg from "../assets/OnError.png";
import { StyledImage } from "./StyledComponents/Images";
import { FlexDiv } from "./StyledComponents/Wrappers";
import { IState } from "../redux/models/IState";

export const Animals = () => {
  const animals = useSelector((state: IState) => state.animals.value);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = onErrorImg;
  };

  return (
    <FlexDiv dir={"column"}>
      {animals.map((animal) => {
        return (
          <FlexDiv dir={"column"} key={animal.id}>
            <StyledImage
              onError={imageOnErrorHandler}
              src={animal.imageUrl}
              alt={animal.name}
            />
            <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
            <p>{animal.shortDescription}</p>
          </FlexDiv>
        );
      })}
    </FlexDiv>
  );
};
