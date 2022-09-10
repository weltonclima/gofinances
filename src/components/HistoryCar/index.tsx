import React from 'react';

import { Amount, Container, Title } from './styles';

interface HistoryCarProps {
  title: string;
  amount: string;
  color: string;
}
export const HistoryCar = ({
  title, amount, color
}: HistoryCarProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}