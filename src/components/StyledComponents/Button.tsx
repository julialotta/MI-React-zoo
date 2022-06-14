import styled from "styled-components";
import { colors } from "./Mixins";

interface IButtonProps {
  color?: string;
  background?: string;
  margin?: string;
  width?: string;
  height?: string;
  hover?: string;
  hoverBackground?: string;
  hoverColor?: string;
}

export const Button = styled.button`
  color: ${(props: IButtonProps) => props.color || colors.GreyLight};
  background-color: ${(props: IButtonProps) =>
    props.background || colors.GreenVeryDark};
  margin: ${(props: IButtonProps) => props.margin || "10px"};
  width: ${(props: IButtonProps) => props.width || "130px"};
  height: ${(props: IButtonProps) => props.height || "40px"};
  border: none;
  border-radius: 5px;
  font-family: "Mukta", sans-serif;
  :hover {
    background-color: ${(props: IButtonProps) =>
      props.hoverBackground || colors.GreyLight};
    color: ${(props: IButtonProps) => props.hoverColor || colors.GreenVeryDark};
    cursor: ${(props: IButtonProps) => props.hover || "pointer"};
  }
`;
