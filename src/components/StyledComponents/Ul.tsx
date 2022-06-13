import styled from "styled-components";
import { colors } from "./Mixins";

export const StyledUl = styled.ul`
  display: flex;
  padding: 0;
  gap: 35px;
  li {
    list-style: none;
    a {
      text-decoration: none;
      color: ${colors.GreenVeryDark};
      font-size: 27px;
    }
    a:hover {
      color: ${colors.GreenDark};
    }
  }
`;
