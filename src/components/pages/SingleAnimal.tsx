import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";
import { Button } from "../StyledComponents/Button";
import { StyledImage } from "../StyledComponents/Images";
import onErrorImg from "../../assets/OnError.png";
import { useDispatch } from "react-redux";
import { feedAnimal } from "../../redux/features/AnimalSlice";
import { getList } from "../../services/StorageService";
import axios from "axios";
import { set } from "../../redux/features/AnimalSlice";
import { StyledHeadingh3 } from "../StyledComponents/Texts";
import { StyledP } from "../StyledComponents/Texts";

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
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isFed, setIsFed] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let storedAnimals: IAnimal[] = getList<IAnimal>();
    if (storedAnimals.length === 0) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
        });
      dispatch(set(animals));
    } else if (storedAnimals.length > 0) {
      for (let i = 0; i < storedAnimals.length; i++) {
        if (storedAnimals[i].id.toString() === params.id) {
          setAnimal(storedAnimals[i]);
          setIsLoading(false);
        }
      }
    }
  }, [isFed, animals]);

  function setTimer() {
    const now = new Date();
    const lastFedDate = new Date(animal.lastFed);
    const timeSpan = now.getTime() - lastFedDate.getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(timeSpan / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeSpan % day) / hour);
    const minutes = Math.floor((timeSpan % hour) / minute);
    const seconds = Math.floor((timeSpan % minute) / second);
    setMins(minutes);
    setSeconds(seconds);
    setHours(hours);
    setDays(days);
  }
  setInterval(setTimer, 1000);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = onErrorImg;
    event.currentTarget.className = "error";
  };

  return (
    <>
      {isLoading ? (
        <>Laddar...</>
      ) : (
        <>
          <Button color='red'>
            <Link to='/'>Tillbaka</Link>
          </Button>
          <StyledHeadingh3>{animal.name}</StyledHeadingh3>
          <StyledP>{animal.longDescription}</StyledP>
          <StyledP>Född: {animal.yearOfBirth}</StyledP>
          <StyledP>
            Ålder: {new Date().getFullYear() - animal.yearOfBirth} år
          </StyledP>
          <StyledP>Mediciner: {animal.medicine}</StyledP>
          <StyledP>
            Fick senast mat: {new Date(animal.lastFed).toLocaleString()}
          </StyledP>
          <StyledP>
            Tid sedan mat: {days} dagar, {hours} timmar, {mins} minuter och{" "}
            {seconds} sekunder.
          </StyledP>
          <StyledP>Latin: {animal.latinName}</StyledP>
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
            <Button
              background='green'
              color='pink'
              onClick={() => {
                dispatch(feedAnimal(animal.id));
                setIsFed(true);
              }}
            >
              Mata djuret
            </Button>
          )}
        </>
      )}
    </>
  );
};
