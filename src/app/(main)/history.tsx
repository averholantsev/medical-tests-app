import React from 'react';
import { Button } from 'react-native-paper';
import { Layout } from '@/src/components';
import { useRouter } from 'expo-router';

const HistoryLayout = () => {
  const { push } = useRouter();

  return (
    <Layout showHeader>
      <Button onPress={() => push('/medical-test')}>Показать результаты</Button>
    </Layout>
  );
};

export default HistoryLayout;
