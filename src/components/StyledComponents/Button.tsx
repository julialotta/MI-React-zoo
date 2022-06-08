import styled from "styled-components";

interface IButtonProps {
  color?: string;
  background?: string;
}

export const Button = styled.button`
  color: ${(props: IButtonProps) => props.color || "black"};
  background-color: ${(props: IButtonProps) => props.background || "white"};
  border: none;
  border-radius: 5px;
`;
