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
import { SignIn } from './src/screens/SignIn';
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { isLoading } = useAuth();

  return !fontsLoaded || isLoading ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator
        color={theme.colors.primary}
        size="large"
      />
    </View>
    :
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
}
