import { FC } from 'react';
import { MD2Colors, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Root: FC = () => {
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
              }}
            />
            <Stack.Screen
              name="medical-test/index"
              options={{
                title: 'Анализы',
                contentStyle: { backgroundColor: MD2Colors.white },
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default Root;
