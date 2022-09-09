import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Header = styled.View`
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