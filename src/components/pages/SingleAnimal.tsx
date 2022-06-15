import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";
import { Button } from "../StyledComponents/Button";
import { StyledImage } from "../StyledComponents/Images";
import onErrorImg from "../../assets/OnError.png";
import { useDispatch } from "react-redux";
import { feedAnimal, unFeedAnimal } from "../../redux/features/AnimalSlice";
import { getList } from "../../services/StorageService";
import axios from "axios";
import { set } from "../../redux/features/AnimalSlice";
import { StyledHeadingh3, StyledLinkDiv } from "../StyledComponents/Texts";
import { StyledP } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Modal from "react-modal";

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
  const [timerTime, setTimerTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fetchedFromAPI, setFetchedFromAPI] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  Modal.setAppElement("#root");
  let interval: NodeJS.Timer;

  useEffect(() => {
    let storedAnimals: IAnimal[] = getList<IAnimal>();
    if (storedAnimals.length === 0) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          dispatch(set(response.data));
          setFetchedFromAPI(true);
        });
    } else if (storedAnimals.length > 0) {
      for (let i = 0; i < storedAnimals.length; i++) {
        if (storedAnimals[i].id.toString() === params.id) {
          setAnimal(storedAnimals[i]);
          setIsLoading(false);
        }
      }
    }
  }, [fetchedFromAPI]);

  useEffect(() => {
    const now = new Date();
    const lastFedDate = new Date(animal.lastFed);
    const timeSpan = now.getTime() - lastFedDate.getTime();
    const hour = 1000 * 60 * 60;
    if (timeSpan > hour * 3) {
      dispatch(unFeedAnimal(animal.id));
    }
    if (timeSpan > hour * 4) {
      setIsOpen(true);
    }
  }, [animal]);

  function setTimer() {
    const timeSpan = new Date().getTime() - new Date(animal.lastFed).getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const seconds = Math.floor((timeSpan % minute) / 1000);
    const minutes = Math.floor((timeSpan % hour) / minute);
    const hours = Math.floor((timeSpan % day) / hour);
    const days = Math.floor(timeSpan / (1000 * 60 * 60 * 24));
    setTimerTime({ days, hours, minutes, seconds });
  }
  interval = setInterval(setTimer, 1000);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = onErrorImg;
  };

  function closeModal() {
    setIsOpen(false);
  }
  function feedSingleAnimal() {
    setAnimal((animal) => ({
      ...animal,
      isFed: true,
      lastFed: new Date().toLocaleString(),
    }));
    clearInterval(interval);
    setIsOpen(false);
    dispatch(feedAnimal(animal.id));
  }

  return (
    <>
      {isLoading ? (
        <>Laddar...</>
      ) : (
        <FlexDiv dir='column' width='70%'>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <FlexDiv
              dir='column'
              width='100%'
              height='min-content'
              justify='center'
              align='center'
            >
              <Button
                width='90px'
                hoverBackground='#6b7b5d'
                hoverColor='none'
                onClick={closeModal}
              >
                ✕
              </Button>
              <StyledHeadingh3>
                Hej, jag heter {animal.name} och jag är hungrig!
              </StyledHeadingh3>
              <StyledP>Det var med än 4 timmar sedan någon matade mig</StyledP>
              <Button
                hoverBackground='#6b7b5d'
                hoverColor='#d6d3d1'
                onClick={feedSingleAnimal}
              >
                {" "}
                Mata {animal.name}
              </Button>
            </FlexDiv>
          </Modal>

          <FlexDiv margin='30px'>
            <StyledLinkDiv>
              <Link to='/'>
                <BsFillArrowLeftCircleFill />
              </Link>
            </StyledLinkDiv>
          </FlexDiv>
          <StyledImage
            onError={imageOnErrorHandler}
            src={animal.imageUrl}
            alt={animal.name}
          />
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
            Tid sedan mat: {timerTime.days} dagar, {timerTime.hours} timmar,{" "}
            {timerTime.minutes} minuter och {timerTime.seconds} sekunder.
          </StyledP>
          <StyledP>Latin: {animal.latinName}</StyledP>

          {animal.isFed ? (
            <Button
              background='#6b7b5d'
              color='#d6d3d1'
              hover=' unset'
              hoverBackground='none'
              hoverColor='none'
            >
              {animal.name} har fått mat
            </Button>
          ) : (
            <Button onClick={feedSingleAnimal}>Mata {animal.name}</Button>
          )}
        </FlexDiv>
      )}
    </>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d6d3d1",
    color: "#515d46",
    border: "none",
    padding: "40px",
  },
};
