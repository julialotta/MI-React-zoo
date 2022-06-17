import OnErrorImg from "../assets/OnError.png";
import { IAnimal } from "../models/IAnimal";

export const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = OnErrorImg;
};

export const getLastFedTimeSpan = (animal: IAnimal) => {
  let timeSpan = new Date().getTime() - new Date(animal.lastFed).getTime();
  timeSpan = timeSpan / 1000 / 60 / 60;
  return timeSpan;
};
