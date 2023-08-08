import { FC, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Button, MD2Colors, Text, TextInput } from 'react-native-paper';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components/native';
import { FormTextField } from '@/src/components/form';
import { useToggle } from '@/src/hooks/useToggle';
import schema from './schema';
import AuthService from '@/src/services/AuthService';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/src/redux/utils';

interface IFormData {
  email: string;
  password: string;
}

const StyledRootView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
  margin: 0 32px 150px;
`;

const StyledFieldsView = styled.View`
  width: 100%;
  gap: 16px;
`;

const defaultValues: IFormData = {
  email: '',
  password: '',
};

export const LoginForm: FC = () => {
  const { push, replace } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useToggle(false);

  const {
    profile: { setState: setProfileState },
  } = useAppDispatch();

  const methods = useForm<IFormData>({
    defaultValues,
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login({
        email: data.email.toLocaleLowerCase().trim(),
        password: data.password,
      });

      await SecureStore.setItemAsync('accessToken', response.data.accessToken);

      setProfileState({ isAuth: true });

      replace('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const routeToRegistration = () => {
    push('/registration');
  };

  return (
    <StyledRootView>
      <Text variant="headlineLarge" style={{ color: MD2Colors.deepPurple900 }}>
        Войти в систему
      </Text>
      <StyledFieldsView>
        <FormProvider {...methods}>
          <FormTextField
            name="email"
            label="Email"
            placeholder="Введите ваш email"
          />
          <FormTextField
            name="password"
            label="Пароль"
            placeholder="Введите ваш пароль"
            right={
              <TextInput.Icon
                icon={!showPassword ? 'eye' : 'eye-off'}
                onPress={toggleShowPassword}
              />
            }
            secureTextEntry={!showPassword}
          />
        </FormProvider>
      </StyledFieldsView>
      <Button
        onPress={methods.handleSubmit(onSubmit)}
        mode="contained"
        style={{ width: '100%' }}
        disabled={isLoading}
        loading={isLoading}
      >
        Войти
      </Button>
      <Button
        onPress={routeToRegistration}
        style={{ width: '100%' }}
        disabled={isLoading}
        loading={isLoading}
      >
        Регистрация
      </Button>
    </StyledRootView>
  );
};
