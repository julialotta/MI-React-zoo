import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";
import { Button } from "../StyledComponents/Button";
import { StyledImage } from "../StyledComponents/Images";
import logo192 from "../../assets/logo192.png";

export const SingleAnimal = () => {
  const [animal, setAnimal] = useState<IAnimal>({
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
    medicine: "",
    isFed: false,
    lastFed: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFed, setIsFed] = useState(false);
  let params = useParams();

  useEffect(() => {
    console.log("körs");

    const storedAnimals = JSON.parse(localStorage.getItem("animals") || "");
    for (let i = 0; i < storedAnimals.length; i++) {
      if (storedAnimals[i].id == params.id) {
        setAnimal(storedAnimals[i]);
        setIsLoading(false);
      }
    }
  }, [isFed]);

  //// lägg denna i en utils??
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = logo192;
    event.currentTarget.className = "error";
  };

  const feedAnimal = () => {
    animal.isFed = true;
    const date = Date.now().toString();
    animal.lastFed = date;
    console.log(animal);
    setIsFed(true);
  };

  return (
    <>
      {isLoading ? (
        <>Laddar...</>
      ) : (
        <>
          <Button>
            <Link to='/'>Tillbaka</Link>
          </Button>
          {/* Rimligt eller onödigt? */}
          <h3>{animal.name ? animal.name : "Ingen info"}</h3>
          <p>{animal.longDescription}</p>
          <p>Född: {animal.yearOfBirth}</p>
          <p>Mediciner: {animal.medicine}</p>
          <p>{animal.lastFed}</p>
          <p>Latin:{animal.latinName}</p>
          <StyledImage
            onError={imageOnErrorHandler}
            src={animal.imageUrl}
            alt={animal.name}
          />
          {animal.isFed ? (
            <Button background='red' color='pink'>
              Redan matat
            </Button>
          ) : (
            <Button background='green' color='pink' onClick={feedAnimal}>
              Mata djuret
            </Button>
          )}
        </>
      )}
    </>
  );
};
