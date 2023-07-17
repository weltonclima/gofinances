import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface IAuthContextData {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  user: IUser;
  isLoading: boolean;
}

type IUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

type IAuthorizationResponse = {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const userStorageKey = '@gofinances:user'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as IUser);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { params, type } = await AuthSession.startAsync({
        authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID
          }&redirect_uri=${process.env.REDIRECT_URI
          }&response_type=token&scope=${encodeURI("profile email")
          }`
      }) as IAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo: IUser = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        }
        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      console.log(error)
      Alert.alert("Não foi possível conectar a conta Google")
    } finally {
      setIsLoading(false);
    }
  }

  const signInWithApple = async () => {
    try {
      setIsLoading(true);
      const credencial = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credencial) {
        const userLogged = {
          id: credencial.user,
          name: credencial.fullName!.givenName!,
          email: credencial.email!,
          picture: `https://ui-avatars.com/api/?name=${credencial.fullName!.givenName!}&length=1`
        }
        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível conectar a conta Apple")
    }finally {
      setIsLoading(false);
    }
  }

  const signOut = async () => {
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as IUser;
        setUser(userLogged);
      }
      setIsLoading(false);
    }
    loadUser();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signInWithApple,
        signOut,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);