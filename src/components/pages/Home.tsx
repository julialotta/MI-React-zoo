import { Animals } from "../Animals";
import { StyledHeadingh3 } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getList } from "../../services/StorageService";
import { set } from "../../redux/features/AnimalSlice";
import axios from "axios";
import { IAnimal } from "../../models/IAnimal";

export const Home = () => {
  const dispatch = useDispatch();
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const LSAnimals = getList();
    if (LSAnimals.length == 0) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          setIsLoaded(true);
        });
      dispatch(set(animals));
    }
  }, [isLoaded]);

  return (
    <>
      <FlexDiv dir='column'>
        <StyledHeadingh3>Våra djur</StyledHeadingh3>
        <Animals />
      </FlexDiv>
    </>
  );
};
