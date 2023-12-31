import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TextInput)`
  width:100%;
  padding: 16px 18px;
  font-size:${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
  margin: -5px 0 10px 0;
`;