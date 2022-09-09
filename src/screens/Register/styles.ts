import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.colors.background};
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