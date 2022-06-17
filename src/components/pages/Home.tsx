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
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
        });
      dispatch(set(animals));
    } else {
      setAnimals(LSAnimals);
      setIsLoading(false);
    }
  }, []);

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
  }, [animals, isLoading]);

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
        <>
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
              <StyledP>
                Det var mer än fyra timmar sen vi fick mat... Klicka på oss för
                att mata oss.
              </StyledP>
              <FlexDiv
                gap={"10px"}
                dir={"column"}
                justify={"start"}
                padding={"0 0 20px 0"}
              >
                {hungryAnimals?.map((hungryAnimal) => {
                  return (
                    <FlexDiv
                      width={"130px"}
                      height={"min-content"}
                      background={"#8b9883"}
                      key={hungryAnimal.id}
                      padding={"2px"}
                      margin={"3px"}
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
          <FlexDiv dir='column' width='100%'>
            <StyledHeadingh3>Våra djur</StyledHeadingh3>
            <Animals />
          </FlexDiv>
        </>
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
    width: "40%",
    marginBottom: "30px",
  },
};
