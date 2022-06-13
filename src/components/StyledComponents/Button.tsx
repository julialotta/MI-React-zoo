import styled from "styled-components";

interface IButtonProps {
  color?: string;
  background?: string;
  margin?: string;
  width?: string;
  height?: string;
  hover?: string;
}

export const Button = styled.button`
  color: ${(props: IButtonProps) => props.color || "black"};
  background-color: ${(props: IButtonProps) => props.background || "white"};
  margin: ${(props: IButtonProps) => props.margin || "10px"};
  width: ${(props: IButtonProps) => props.width || "130px"};
  height: ${(props: IButtonProps) => props.height || "40px"};
  border: none;
  border-radius: 5px;
  a {
    color: ${(props: IButtonProps) => props.color || "black"};
    text-decoration: none;
  }

  :hover {
    cursor: ${(props: IButtonProps) => props.hover || "pointer"};
  }
`;
