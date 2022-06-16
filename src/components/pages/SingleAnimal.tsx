import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";
import { Button } from "../StyledComponents/Button";
import { StyledImage } from "../StyledComponents/Images";
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
import { imageOnErrorHandler } from "../../services/Helpers";

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
        });
    } else if (storedAnimals.length > 0) {
      for (let i = 0; i < storedAnimals.length; i++) {
        if (storedAnimals[i].id.toString() === params.id) {
          setAnimal(storedAnimals[i]);
          setIsLoading(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timeSpan = new Date().getTime() - new Date(animal.lastFed).getTime();
    if (timeSpan > 1000 * 60 * 60 * 3) {
      dispatch(unFeedAnimal(animal.id));
    }
    if (timeSpan > 1000 * 60 * 60 * 4) {
      setIsOpen(true);
    }
  }, [animal, isLoading]);

  function setTimer() {
    const timeSpan = new Date().getTime() - new Date(animal.lastFed).getTime();
    let seconds = Math.floor(timeSpan / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    setTimerTime({ days, hours, minutes, seconds });
  }
  interval = setInterval(setTimer, 1000);

  function feedSingleAnimal() {
    clearInterval(interval);
    setAnimal((animal) => ({
      ...animal,
      isFed: true,
      lastFed: new Date().toLocaleString(),
    }));
    dispatch(feedAnimal(animal.id));
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading ? (
        <FlexDiv height='50vh' align={"start"}>
          <StyledP>Laddar...</StyledP>
        </FlexDiv>
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
