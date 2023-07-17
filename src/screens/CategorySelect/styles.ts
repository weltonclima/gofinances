import { Feather } from '@expo/vector-icons';
import { FlatList, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { CategoryProps } from ".";

//(GestureHandlerRootView)`
export const Container = styled(View)`
  flex:1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled(View)`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.shape};
  font-size:${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 19px;
`;

export const CategoryList = styled(FlatList<CategoryProps>)`

`;

export const Category = styled(RectButton) <{ isActive: boolean }>`
  width: 100%;
  padding:${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, isActive }) => isActive
    ? theme.colors.secondary_light
    : theme.colors.background
  };
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled(View)`
height: 1px;
width: 100%;
background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled(View)`
width: 100%;
padding: 24px;
`;