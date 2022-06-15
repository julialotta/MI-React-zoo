import styled from "styled-components";
import { colors } from "./Mixins";
import { IStylingProps } from "./StyledInterfaces";

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props: IStylingProps) => props.dir || "row"};
  align-items: ${(props: IStylingProps) => props.align || "center"};
  justify-content: ${(props: IStylingProps) => props.justify || "center"};
  flex-wrap: ${(props: IStylingProps) => props.wrap || "nowrap"};
  background-color: ${(props: IStylingProps) => props.background || "none"};
  width: ${(props: IStylingProps) => props.width || "100%"};
  min-width: ${(props: IStylingProps) => props.maxWidth || ""};
  height: ${(props: IStylingProps) => props.height || "100%"};
  gap: ${(props: IStylingProps) => props.gap || "0"};
  margin: ${(props: IStylingProps) => props.margin || "0"};
  padding: ${(props: IStylingProps) => props.padding || "0"};
  border-radius: ${(props: IStylingProps) => props.borderRad || "0"};
`;

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
