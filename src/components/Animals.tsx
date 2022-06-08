import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import logo192 from "../assets/logo192.png";
import { StyledImage } from "./StyledComponents/Images";
import { StyledWrapper, FlexCWrapper } from "./StyledComponents/Wrappers";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    const storedAnimals = localStorage.getItem("animals");
    if (storedAnimals) {
      setAnimals(JSON.parse(storedAnimals));
    } else if (!storedAnimals) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          localStorage.setItem("animals", JSON.stringify(response.data));
        });
    }
  }, []);

  //// lägg denna i en utils??

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = logo192;
    event.currentTarget.className = "error";
  };

  return (
    <StyledWrapper>
      {animals.map((animal) => {
        return (
          <FlexCWrapper key={animal.id}>
            <StyledImage
              onError={imageOnErrorHandler}
              src={animal.imageUrl}
              alt={animal.name}
            />
            <Link to={`/animals/${animal.id}`}>{animal.name}</Link>

            <p>{animal.shortDescription}</p>
          </FlexCWrapper>
        );
      })}
    </StyledWrapper>
  );
};
