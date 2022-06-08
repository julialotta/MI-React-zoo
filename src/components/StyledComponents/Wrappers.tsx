import styled from "styled-components";
import { colors } from "./Mixins";

export const AppWrapper = styled.div`
  background-color: ${colors.GreenLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Mukta", sans-serif;
  margin: 0;
  padding: 0;
`;

export const StyledWrapper = styled.div`
  background-color: ${colors.GreenMedium};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 80%;
  gap: 10px;
`;

export const FlexCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;
