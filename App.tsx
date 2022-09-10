import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { ActivityIndicator, View, StatusBar } from 'react-native';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });


  return !fontsLoaded ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator
        color={theme.colors.primary}
        size="large"
      />
    </View>
    :
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
}
