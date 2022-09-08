import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import { Feather } from '@expo/vector-icons';
import { gestureHandlerRootHOC, GestureHandlerRootView, RectButton } from "react-native-gesture-handler"

import {
  Category, CategoryList, Container, Footer, Header, Icon, Name,
  Separator, Title
} from './styles';

export interface CategoryProps {
  key: string;
  name: string;
  icon: string;
  color: string;
}

interface Props {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category, closeSelectCategory, setCategory
}: Props) => {


  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <CategoryList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <GestureHandlerRootView>
            <Category
              onPress={() => setCategory(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          </GestureHandlerRootView>

        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        {/* <GestureHandlerRootView>
          <RectButton
            onPress={() => {
              closeSelectCategory()
              console.log({ category })
            }}
          >
            <Text>
              Selecionar
            </Text>
          </RectButton>
        </GestureHandlerRootView> */}

        <Button
          title='Selecionar'
          onPress={() => closeSelectCategory()}
        />
      </Footer>
    </Container>
  );
}

