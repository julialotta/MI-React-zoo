import styled from "styled-components";
import { colors } from "./Mixins";
import { IStylingProps } from "./StyledInterfaces";

export const Button = styled.button`
  color: ${(props: IStylingProps) => props.color || colors.GreyLight};
  background-color: ${(props: IStylingProps) =>
    props.background || colors.GreenVeryDark};
  margin: ${(props: IStylingProps) => props.margin || "10px"};
  width: ${(props: IStylingProps) => props.width || "130px"};
  height: ${(props: IStylingProps) => props.height || "40px"};
  border: none;
  border-radius: 5px;
  font-family: "Mukta", sans-serif;
  :hover {
    background-color: ${(props: IStylingProps) =>
      props.hoverBackground || colors.GreyLight};
    color: ${(props: IStylingProps) =>
      props.hoverColor || colors.GreenVeryDark};
    cursor: ${(props: IStylingProps) => props.hover || "pointer"};
  }
`;
