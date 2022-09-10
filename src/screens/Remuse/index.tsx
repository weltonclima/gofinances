import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { Header } from '../../components/Header';
import { HistoryCar } from '../../components/HistoryCar';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  ChartContainer, Container, Content, Month, MonthSelect, MonthSelectButton,
  MonthSelectIcon
} from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const dataKey = '@gofinances:transactions';

type Category = {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Remuse = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Category[]>([]);

  const theme = useTheme();

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionCardProps[] = response ? JSON.parse(response) : [];

    const totalByCategory: Category[] = [];

    const expensives = responseFormatted.filter(f =>
      f.type === 'negative' &&
      new Date(f.date).getMonth() == selectedDate.getMonth() &&
      new Date(f.date).getFullYear() == selectedDate.getFullYear()
    );
    const expensivesTotal = expensives.reduce((previousValue, currentValue) => {
      return previousValue + +currentValue.amount;
    }, 0);

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += +expensive.amount;
        }
      })

      if (categorySum > 0) {

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: new Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL',
          }).format(categorySum),
          color: category.color,
          percent
        });
      }
    });

    setData(totalByCategory);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]));

  return (
    <Container>
      <Header title='Resumo por categoria' />
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </View>
        :
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <GestureHandlerRootView>
                <MonthSelectButton onPress={() => setSelectedDate(subMonths(selectedDate, 1))} >
                  <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>
              </GestureHandlerRootView>
              <Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </Month>
              <GestureHandlerRootView>
                <MonthSelectButton onPress={() => setSelectedDate(addMonths(selectedDate, 1))}>
                  <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
              </GestureHandlerRootView>

            </MonthSelect>
            <ChartContainer>
              <VictoryPie
                data={data}
                colorScale={data.map(item => item.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={50}
                x="percent"
                y="total"
              />
            </ChartContainer>
            {data.map(item => (
              <HistoryCar
                key={item.key}
                amount={item.totalFormatted}
                color={item.color}
                title={item.name}
              />
            ))}
          </Content>
        </>
      }
    </Container>
  );
}