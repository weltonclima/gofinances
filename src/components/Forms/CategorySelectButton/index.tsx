import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";

import { Category, Container, Icon } from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export const CategorySelectButton = ({ title, ...rest }: Props) => {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
    </GestureHandlerRootView>
  );
}