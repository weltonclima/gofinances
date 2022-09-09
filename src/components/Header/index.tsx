import React from 'react';

import * as Styles from './styles';

interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  return (
    <Styles.Header>
      <Styles.Title>{title}</Styles.Title>
    </Styles.Header>
  );
}