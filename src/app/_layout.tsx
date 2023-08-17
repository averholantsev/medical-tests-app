import { FC } from 'react';
import { MD2Colors, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { Settings } from 'luxon';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Root: FC = () => {
  Settings.defaultLocale = 'ru';

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: MD2Colors.white },
                statusBarStyle: 'dark',
              }}
            />
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: MD2Colors.white },
                statusBarStyle: 'dark',
              }}
            />
            <Stack.Screen
              name="medical-test/index"
              options={{
                title: 'Анализы',
                contentStyle: { backgroundColor: MD2Colors.white },
                statusBarStyle: 'dark',
              }}
            />
            <Stack.Screen
              name="auth/index"
              options={{
                headerShown: false,
                title: 'Авторизация',
                contentStyle: { backgroundColor: MD2Colors.white },
                statusBarStyle: 'dark',
              }}
            />
            <Stack.Screen
              name="registration/index"
              options={{
                headerShown: true,
                title: 'Регистрация',
                contentStyle: { backgroundColor: MD2Colors.white },
                statusBarStyle: 'dark',
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default Root;
