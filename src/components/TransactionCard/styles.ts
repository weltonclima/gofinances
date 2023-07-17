import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 17px 24px;
  margin-top: 16px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<{ type: "positive" | "negative" }>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) => 
    type === 'positive' ? theme.colors.success : theme.colors.attention
  };
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  margin-left: 17px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;