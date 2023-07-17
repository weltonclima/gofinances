import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/useAuth';
import {
  Container, Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title, TransactionList,
  Transactions,
  User, UserGreeting, UserInfo, UserName,
  UserWrapper
} from './styles';

type HighlightProps = {
  amount: string;
  lastDate: string;
}
type Highlight = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [data, setData] = useState<TransactionCardProps[]>([])
  const [highlight, setHighlight] = useState({} as Highlight)
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { user, signOut } = useAuth();

  function formattedCurrency(number: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(number)
  }

  function formattedDate(
    collection: TransactionCardProps[],
    type: "positive" | "negative",
    options?: Intl.DateTimeFormatOptions
  ) {
    const lastTransactions = collection.filter(f => f.type === type)

    if (!lastTransactions.length) return

    return new Intl.DateTimeFormat('pt-BR', options).format(
      new Date(
        Math.max.apply(Math, lastTransactions.map(m => new Date(m.date).getTime()))
      ))
  }

  async function loadTransactions() {
    //await AsyncStorage.removeItem(dataKey);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);
      const transactions: TransactionCardProps[] = response ? JSON.parse(response) : [];

      if (!transactions.length) return

      const transactionsFormatted = transactions
        .map((item) => {
          item.type === 'positive'
            ? entriesTotal += +item.amount
            : expensiveTotal += +item.amount;

          return {
            id: item.id,
            type: item.type,
            name: item.name,
            amount: new Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: 'BRL',
            }).format(+item.amount),
            category: item.category,
            date: new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric'
            }).format(new Date(item.date))
          }
        });

      setData(transactionsFormatted);

      const lastTransactionsEntries = formattedDate(transactions, "positive", { day: '2-digit', month: 'long' })

      const lastTransactionsExpensive = formattedDate(transactions, "negative", { day: '2-digit', month: 'long' })

      setHighlight({
        entries: {
          amount: formattedCurrency(entriesTotal),
          lastDate: !!lastTransactionsEntries
            ? `Última entrada dia ${lastTransactionsEntries}`
            : "",
        },
        expensives: {
          amount: formattedCurrency(expensiveTotal),
          lastDate: !!lastTransactionsExpensive
            ? `Última saída dia ${lastTransactionsExpensive}`
            : "",
        },
        total: {
          amount: formattedCurrency(entriesTotal - expensiveTotal),
          lastDate: !!lastTransactionsExpensive
            ? `01 à ${lastTransactionsExpensive}`
            : !!lastTransactionsEntries
              ? `01 à ${lastTransactionsEntries}`
              : ""
        }
      });

    } catch (error) {
      console.log(error)
      Alert.alert("Error!")
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []));

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
                <Photo source={{ uri: user.picture }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <GestureHandlerRootView>
                <LogoutButton onPress={() => signOut()}>
                  <Icon name="power" />
                </LogoutButton>
              </GestureHandlerRootView>
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