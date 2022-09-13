import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Content = styled.View`
  width: 100%;
  height:70%;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
`;

export const ContentLogo = styled.View`
  align-items: center;
  width:100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  margin-top: 48px;
`;

export const SignTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  margin: 80px 0 67px;
`;

export const Footer = styled.View`
  margin-top:  ${RFPercentage(-4)}px;
  padding: 0 32px;
`;