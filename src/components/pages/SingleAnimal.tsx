import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { useState, useEffect } from "react";
import { Button } from "../StyledComponents/Button";
import { StyledImage } from "../StyledComponents/Images";
import { useDispatch, useSelector } from "react-redux";
import { feedAnimal, unFeedAnimal } from "../../redux/features/AnimalSlice";
import { getList } from "../../services/StorageService";
import axios from "axios";
import { set } from "../../redux/features/AnimalSlice";
import { StyledHeadingh3, StyledLinkDiv } from "../StyledComponents/Texts";
import { StyledP } from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Modal from "react-modal";
import {
  getLastFedTimeSpan,
  imageOnErrorHandler,
} from "../../services/Helpers";
import { IState } from "../../redux/models/IState";
import { ModalStyling } from "../StyledComponents/Styling/ModalStyling";

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
  const [modalIsOpen, setIsOpen] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const reduxAnimals = useSelector((state: IState) => state.animals.value);
  Modal.setAppElement("#root");

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
  }, [reduxAnimals]);

  useEffect(() => {
    const timeSpan = getLastFedTimeSpan(animal);
    if (timeSpan > 3) {
      dispatch(unFeedAnimal(animal.id));
    }
    if (timeSpan > 4) {
      setIsOpen(true);
    }
  }, [animal, isLoading]);

  function feedSingleAnimal() {
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
            style={ModalStyling}
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
