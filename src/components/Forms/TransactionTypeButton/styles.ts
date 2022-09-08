import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

interface TransactionType {
  isActive: boolean;
  type: 'up' | 'down'
}

export const Container = styled.View<TransactionType>`
  width: 100%;
  border-width: ${({ isActive }) => isActive ? 0 : 1}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  ${({ isActive, type }) =>
    isActive && type === 'up'
      ? css`background-color: ${({ theme }) => theme.colors.success_light};`
      : isActive && type === 'down'
      && css`background-color: ${({ theme }) => theme.colors.attention_light};`
  };

`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Icon = styled(Feather) <{ type: string }>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  padding-left: 12px;
`;
