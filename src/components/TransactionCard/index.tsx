import React from 'react';
import {
  Amount, Category, CategoryName, Container, Date, Footer, Icon, Title
} from './styles';

type CategoryProps = {
  name: string;
  icon: string;
}

export type TransactionCardProps = {
  id: string;
  type: "positive" | "negative"
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type} >{`${data.type == 'negative' ? "- " : ""}${data.amount}`}</Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}