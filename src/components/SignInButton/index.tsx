import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Button, ImageContainer, Title } from './styles';

interface SignInButtonProps extends RectButtonProps {
  title: String
  icon: FC<SvgProps>
}

export const SignInButton = ({
  title, icon: Icon, ...rest
}: SignInButtonProps) => {
  return (
    <GestureHandlerRootView>
      <Button {...rest}>
        <ImageContainer>
          <Icon />
        </ImageContainer>
        <Title>
          {title}
        </Title>
      </Button>
    </GestureHandlerRootView>
  );
}