import React from 'react';
import { categories } from '../../utils/categories';
import {
  Amount, Category, CategoryName, Container, Date, Footer, Icon, Title
} from './styles';

type CategoryProps = {
  name: string;
  icon: string;
  color: string;
  key: string;
}

export type TransactionCardProps = {
  id: string;
  type: "positive" | "negative"
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  const category = categories.find(f => f.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type} >{`${data.type == 'negative' ? "- " : ""}${data.amount}`}</Amount>
      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}