import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { CategoryProps } from './src/screens/CategorySelect';
import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

export default function App() {
  // const [category, setCategory] = useState({
  //   key: "category",
  //   name: "Categoria",
  //   color: "",
  //   icon: ""
  // } as CategoryProps);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  return !fontsLoaded ?
    <AppLoading />
    :
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
      {/* <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => {}}
        /> */}
    </ThemeProvider>
}
