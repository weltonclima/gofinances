import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.colors.background};
`;

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

export const Form = styled.View`
  flex:1;
  width:100%;
  padding: 24px;
  justify-content: space-between;
`;

export const Fields = styled.View`
  
`;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 16px 0;
`;