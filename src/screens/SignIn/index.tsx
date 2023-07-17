import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/finance.svg';
import GoogleSvg from '../../assets/google.svg';
import { SignInButton } from '../../components/SignInButton';
import { useAuth } from '../../hooks/useAuth';
import { Container, Content, ContentLogo, Footer, SignTitle, Title } from './styles';

export const SignIn = () => {
  const { signInWithGoogle, signInWithApple, isLoading } = useAuth();
  const theme = useTheme();

  return (
    <Container>
      <Content>
        <ContentLogo>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </ContentLogo>
        <SignTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignTitle>
      </Content>
      <Footer>
        {Platform.OS === 'android' &&
          <SignInButton
            icon={GoogleSvg}
            title="Entrar com Google"
            onPress={() => signInWithGoogle()}
          />
        }
        {Platform.OS === 'ios' &&
          <SignInButton
            icon={AppleSvg}
            title="Entrar com Apple"
            onPress={() => signInWithApple()}
          />
        }
        {isLoading &&
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        }
      </Footer>
    </Container>
  );
}