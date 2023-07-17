import React from 'react';
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";

import { Button, Container, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  isActive: boolean;
  type: 'up' | 'down'
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export const TransactionTypeButton = ({
  title, isActive, type, ...rest
}: Props) => {
  return (
    <GestureHandlerRootView>
      <Container  isActive={isActive} type={type}>
        <Button {...rest}>
          <Icon name={icon[type]} type={type} />
          <Title>
            {title}
          </Title>
        </Button>
      </Container>
    </GestureHandlerRootView>
  );
}