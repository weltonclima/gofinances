import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { View } from "react-native";

export const Container = styled(View) <{ color: string }>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 13px 24px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;