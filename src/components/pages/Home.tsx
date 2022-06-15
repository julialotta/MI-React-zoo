import { Animals } from "../Animals";
import {
  StyledHeadingh3,
  StyledLinkDiv,
  StyledP,
} from "../StyledComponents/Texts";
import { FlexDiv } from "../StyledComponents/Wrappers";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getList } from "../../services/StorageService";
import { set } from "../../redux/features/AnimalSlice";
import axios from "axios";
import { IAnimal, IHungryAnimal } from "../../models/IAnimal";
import Modal from "react-modal";
import { Button } from "../StyledComponents/Button";
import { Link } from "react-router-dom";

export const Home = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hungryAnimals, setHungryAnimals] = useState<IHungryAnimal[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  Modal.setAppElement("#root");

  useEffect(() => {
    const LSAnimals = getList<IAnimal>();
    if (LSAnimals.length === 0) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);
          setIsLoaded(true);
        });
      dispatch(set(animals));
    } else {
      setAnimals(LSAnimals);
    }
  }, [isLoaded]);

  useEffect(() => {
    const now = new Date();
    const hour = 1000 * 60 * 60;
    let newArr = [...hungryAnimals];
    for (let i = 0; i < animals.length; i++) {
      const timeSpan = now.getTime() - new Date(animals[i].lastFed).getTime();
      if (timeSpan > hour * 4) {
        let newHungryAnimal = { id: animals[i].id, name: animals[i].name };
        newArr[i] = newHungryAnimal;
        setHungryAnimals(newArr);
        setIsOpen(true);
      }
    }
  }, [animals, isLoaded]);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <FlexDiv dir='column' width='100%'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <FlexDiv
            dir='column'
            height='70vh'
            justify='start'
            align='center'
            width='100%'
          >
            <Button
              width='90px'
              hoverBackground='#6b7b5d'
              hoverColor='none'
              onClick={closeModal}
            >
              ✕
            </Button>
            <StyledHeadingh3>Vi är hungriga!</StyledHeadingh3>
            <StyledP>Klicka på oss för att ge oss mat</StyledP>
            <FlexDiv padding='30px' dir={"column"}>
              {hungryAnimals.map((hungryAnimal) => {
                return (
                  <FlexDiv
                    width={"130px"}
                    height={"min-content"}
                    background={"#8b9883"}
                    key={hungryAnimal.id}
                    margin={"0 0 10px 0"}
                    padding={"2px"}
                    borderRad={"5px"}
                    justify={"center"}
                  >
                    <StyledLinkDiv
                      key={hungryAnimal.id}
                      font='Mukta, sans-serif'
                      fontSize='20px'
                    >
                      <Link to={`/animals/${hungryAnimal.id}`}>
                        {hungryAnimal.name}
                      </Link>
                    </StyledLinkDiv>
                  </FlexDiv>
                );
              })}
            </FlexDiv>
          </FlexDiv>
        </Modal>

        <StyledHeadingh3>Våra djur</StyledHeadingh3>
        <Animals />
      </FlexDiv>
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
    width: "40%",
    marginBottom: "30px",
  },
};
