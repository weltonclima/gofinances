import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCardProps, TransactionCard } from '../../components/TransactionCard';
import {
  Container, Header, Photo, User, UserGreeting, UserInfo, UserName, Icon, UserWrapper,
  HighlightCards, Transactions, Title, TransactionList, LogoutButton
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

type HighlightProps = {
  amount: string;
  lastDate: string;
}
type Highlight = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

const dataKey = '@gofinances:transactions';

export function Dashboard() {
  const [data, setData] = useState<TransactionCardProps[]>([])
  const [highlight, setHighlight] = useState({} as Highlight)
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function formattedCurrency(number: number) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(number)
  }

  function formattedDate(date: number | Date, options?: Intl.DateTimeFormatOptions) {
    return Intl.DateTimeFormat('pt-BR', options).format(date)
  }

  async function loadTransactions() {
    //await AsyncStorage.removeItem(dataKey);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions: TransactionCardProps[] = response ? JSON.parse(response) : [];

      const transactionsFormatted = transactions
        .map((item) => {
          item.type === 'positive'
            ? entriesTotal += +item.amount
            : expensiveTotal += +item.amount;

          return {
            id: item.id,
            type: item.type,
            name: item.name,
            amount: Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: 'BRL',
            }).format(+item.amount),
            category: item.category,
            date: Intl.DateTimeFormat('pt-BR').format(new Date(item.date))
          }
        });

      setData(transactionsFormatted);

      const lastTransactionsEntries = new Date(Math.max.apply(Math, transactions
        .filter(f => f.type === 'positive')
        .map(m => new Date(m.date).getTime())));

      const lastTransactionsExpensive = new Date(Math.max.apply(Math, transactions
        .filter(f => f.type === 'negative')
        .map(m => new Date(m.date).getTime())));

      console.log({ lastTransactionsEntries, lastTransactionsExpensive })
      setHighlight({
        entries: {
          amount: formattedCurrency(entriesTotal),
          lastDate: `Última entrada dia ${formattedDate(lastTransactionsEntries, { day: '2-digit', month: 'long' })}`,
        },
        expensives: {
          amount: formattedCurrency(expensiveTotal),
          lastDate: `Última saída dia ${formattedDate(lastTransactionsExpensive, { day: '2-digit', month: 'long' })}`,
        },
        total: {
          amount: formattedCurrency(entriesTotal - expensiveTotal),
          lastDate: `01 à ${formattedDate(lastTransactionsExpensive, { day: '2-digit', month: 'long' })}`
        }
      });

    } catch (error) {
      console.log(error)
      Alert.alert("Error!")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions()
  }, []);

  useFocusEffect(
    useCallback(() => { loadTransactions() }, [])
  );

  return (
    <Container>
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </View>
        :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/69590175?v=4' }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Welton</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => { }}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards >
            <HighlightCard
              title='Entradas'
              type='up'
              amount={highlight.entries?.amount}
              lastTransaction={highlight.entries?.lastDate}
            />
            <HighlightCard
              title='Saídas'
              type='down'
              amount={highlight.expensives?.amount}
              lastTransaction={highlight.expensives?.lastDate}
            />
            <HighlightCard
              title='Total'
              type='total'
              amount={highlight.total?.amount}
              lastTransaction={highlight.total?.lastDate}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}

            />
          </Transactions>
        </>
      }
    </Container>
  )
}