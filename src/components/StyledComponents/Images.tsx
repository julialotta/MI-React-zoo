import styled from "styled-components";
import { device } from "./Mixins";

export const StyledImage = styled.img`
  height: 110px;
  width: 110px;
  object-fit: cover;
  border-radius: 50%;
  filter: brightness(90%) contrast(75%);
  @media ${device.sm} {
    height: 180px;
    width: 180px;
  }
`;
