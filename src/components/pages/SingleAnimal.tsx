import axios from "axios";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";

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
  let params = useParams();

  useEffect(() => {
    axios
      .get<IAnimal>(
        "https://animals.azurewebsites.net/api/animals/" + params.id
      )
      .then((data) => {
        setIsLoading(false);
        setAnimal(data.data);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <>Laddar...</>
      ) : (
        <>
          <h3>{animal.name}</h3>
          Plot: {animal.longDescription}
        </>
      )}
    </>
  );
};
