import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface TypeProps {
  type: "up" | "down" | "total"
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape
  };
  
  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;
  margin-right: 16px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
  
`;

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(40)}px;

  color: ${({ theme, type }) =>
    type === 'up'
      ? theme.colors.success
      : type === 'down'
        ? theme.colors.attention
        : theme.colors.shape
  };
  
`;

export const Footer = styled.View`
  margin-top: 35px
`;

export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height:${RFValue(48)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title
  };

`;

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(18)}px;

    color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;