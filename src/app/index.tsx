import { Layout } from '@/src/components';
import { FC, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import styled from 'styled-components/native';
import { ActivityIndicator, Button, MD2Colors, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '../redux/utils';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

const HomeLayout: FC = () => {
  const {
    medicalTest: { getResults },
  } = useAppDispatch();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const pickDocument = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'application/pdf'],
      });

      console.log('file', result);

      if (!result.canceled && result.assets.length) {
        const isDone = await getResults(result.assets[0]);

        if (isDone) {
          push('/medical-test');
        }
      }
    } catch (error) {
      console.error('Ошибка отправки файла на сервер', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    setIsLoading(true);

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      console.log('image', result);

      if (!result.canceled && result.assets.length) {
        const isDone = await getResults(result.assets[0]);

        if (isDone) {
          push('/medical-test');
        }
      }
    } catch (error) {
      console.error('Ошибка отправки изображения на сервер', error);
    } finally {
      setIsLoading(false);
    }
  };

  const content = isLoading ? (
    <ActivityIndicator size="large" color={MD2Colors.tealA700} animating />
  ) : (
    <>
      <Text
        variant="headlineLarge"
        style={{ marginBottom: 16, color: MD2Colors.deepPurple900 }}
      >
        Расшифровать ОАК
      </Text>
      <Button icon="image" mode="contained" onPress={pickImage}>
        Загрузить изображение
      </Button>
      <Button icon="text-box" mode="contained" onPress={pickDocument}>
        Загрузить документ
      </Button>
    </>
  );

  return (
    <Layout>
      <Wrapper>{content}</Wrapper>
    </Layout>
  );
};

export default HomeLayout;
