import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import logo192 from "../assets/logo192.png";
import { StyledImage } from "./StyledComponents/Images";
import { Button } from "./StyledComponents/Button";

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

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = logo192;
    event.currentTarget.className = "error";
  };

  return (
    <>
      <div>
        {animals.map((animal) => {
          return (
            <div key={animal.id}>
              <StyledImage
                onError={imageOnErrorHandler}
                src={animal.imageUrl}
                alt={animal.name}
              />
              <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
              <p>{animal.shortDescription}</p>
              <Button background='red' color='pink'>
                Mata djuret
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
