import styled from "styled-components";
import { colors } from "./Mixins";

interface IFlexDivProps {
  dir?: string;
  align?: string;
  justify?: string;
  wrap?: string;
  background?: string;
  width?: string;
  height?: string;
  gap?: string;
  margin?: string;
  padding?: string;
  borderRad?: string;
}

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props: IFlexDivProps) => props.dir || "row"};
  align-items: ${(props: IFlexDivProps) => props.align || "center"};
  justify-content: ${(props: IFlexDivProps) => props.justify || "center"};
  flex-wrap: ${(props: IFlexDivProps) => props.wrap || "nowrap"};
  background-color: ${(props: IFlexDivProps) => props.background || "none"};
  width: ${(props: IFlexDivProps) => props.width || "100%"};
  height: ${(props: IFlexDivProps) => props.height || "100%"};
  gap: ${(props: IFlexDivProps) => props.gap || "0"};
  margin: ${(props: IFlexDivProps) => props.margin || "0"};
  padding: ${(props: IFlexDivProps) => props.padding || "0"};
  border-radius: ${(props: IFlexDivProps) => props.borderRad || "0"};
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
