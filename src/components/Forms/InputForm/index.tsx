import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInputProps, View } from 'react-native';
import { Input } from '../Input';

import { Container } from './styles';

interface Props<T extends FieldValues> extends TextInputProps {
  control: Control<T, any>;
  name: Path<T>;
}

export const InputForm = <T extends FieldValues,>({
  control, name, ...rest
}: Props<T>) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          formState: { errors }
        }) => (
          <Input
            onChangeText={onChange}
            value={value}
            isError={!!errors[name]}
            error={errors[name]?.message?.toString()}
            {...rest}
          />
        )}
      />
    </Container>
  );
}