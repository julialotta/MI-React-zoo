import OnErrorImg from "../assets/OnError.png";

export const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = OnErrorImg;
};
