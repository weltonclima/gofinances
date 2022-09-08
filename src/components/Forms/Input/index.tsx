import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Error } from './styles';

interface Props extends TextInputProps {
  isError?: boolean;
  error?: string;
}

export const Input = ({
  isError = false, error, ...rest
}: Props) => {

  return (
    <>
      <Container {...rest} />
      {isError &&
        <Error>{error}</Error>
      }
    </>
  )
}