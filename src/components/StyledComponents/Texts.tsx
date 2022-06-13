import styled from "styled-components";
import { colors } from "./Mixins";

export const StyledTopHeading = styled.h1`
  a {
    font-family: "Bebas Neue", cursive;
    color: ${colors.GreyLight};
    text-decoration: none;
    text-align: center;
    font-size: 60px;
  }
  a:hover {
    color: ${colors.GreenVeryDark};
  }
`;

export const StyledHeadingh3 = styled.h3`
  font-family: "Bebas Neue", cursive;
  color: ${colors.GreenVeryDark};
  font-size: 40px;
  text-align: center;
`;
export const StyledHeadingh5 = styled.h5`
  font-family: "Bebas Neue", cursive;
  color: ${colors.GreenVeryDark};
  font-size: 20px;
  text-align: center;
`;

export const StyledP = styled.p`
  font-family: "Mukta", sans-serif;
  text-align: center;
`;

export const StyledLinkDiv = styled.div`
  a {
    font-size: 40px;
    font-family: "Bebas Neue", cursive;
    color: ${colors.GreyLight};
    text-decoration: none;
  }
  a:hover {
    color: ${colors.GreenVeryDark};
  }
`;
