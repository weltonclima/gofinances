import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, Keyboard, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategoryProps, CategorySelect } from '../CategorySelect';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container, Fields, Form, Header, Title, TransactionTypes } from './styles';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { TransactionCardProps } from '../../components/TransactionCard';
interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo').required('Preço é obrigatório'),
}).required();

const dataKey = '@gofinances:transactions';

type TransactionType = "positive" | "negative"

export const Register = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    color: "",
    icon: ""
  } as CategoryProps);

  const navigation = useNavigation();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const handleRegister: SubmitHandler<FormData> = async (form) => {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione o tipo da transação');

    const newTransaction: TransactionCardProps = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category,
      date: new Date().toLocaleDateString('pt-BR'),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType(undefined);
      setCategory({
        key: "category",
        name: "Categoria",
        color: "",
        icon: ""
      });

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Listagem'
        })
      );

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder='Nome'
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <InputForm
              placeholder='Preço'
              name="amount"
              control={control}
              keyboardType="numeric"
            />
            <TransactionTypes>
              <TransactionTypeButton
                title='Income'
                type='up'
                onPress={() => setTransactionType("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title='Outcome'
                type='down'
                onPress={() => setTransactionType("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={() => setModalOpen(true)}
            />
          </Fields>
          {/* <GestureHandlerRootView>
            <RectButton
              onPress={() => {
                console.log({ category })
                setModalOpen(true)
              }}
            >
              <Text>
              Enviar
              </Text>
            </RectButton>
          </GestureHandlerRootView> */}

          <Button
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        <Modal visible={modalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}