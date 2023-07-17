import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Header = styled.View`
  width:100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size:${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 19px;
`;