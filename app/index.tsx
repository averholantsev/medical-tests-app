import { Layout, UploadButton } from '@/components';
import { FC, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

import styled from 'styled-components/native';
import MedicalService from '@/services/MedicalService';
import { Text } from 'react-native';
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import { NavigatorContext } from 'expo-router/build/views/Navigator';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

const HomeLayout: FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicalTest, setMedicalTest] = useState<any>(null);

  console.log(props);

  const pickDocument = async () => {
    setIsLoading(true);

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'application/pdf'],
      });

      console.log('result', result);

      if (!result.canceled && result.assets.length) {
        const response = await MedicalService.uploadMedicalTest(
          result.assets[0]
        );

        if (response) {
          setMedicalTest(response);
        }
      }
    } catch (error) {
      console.error('Ошибка отправки файла на сервер', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Wrapper>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </Wrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper>
        <Button icon="text-box" mode="contained" onPress={pickDocument}>
          Загрузить документ
        </Button>
        <Button icon="image" mode="contained">
          Загрузить фото
        </Button>
        <Button icon="camera" mode="contained">
          Использовать камеру
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default HomeLayout;
