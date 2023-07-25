import { Layout, TestRow } from '@/src/components';
import { useAppDispatch, useAppSelector } from '@/src/redux/utils';
import { FC, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Divider,
  MD2Colors,
  Text,
} from 'react-native-paper';

const MedicalTest: FC = () => {
  const {
    medicalTest: { getDictionary },
  } = useAppDispatch();
  const { medicalTest, isLoadingDictionary, dictionary, error } =
    useAppSelector((s) => ({
      medicalTest: s.medicalTest.result,
      dictionary: s.medicalTest.dictionary,
      error: s.medicalTest.error,
      isLoadingDictionary: s.loading.effects.medicalTest.getDictionary,
    }));

  useEffect(() => {
    getDictionary();
  }, []);

  if (isLoadingDictionary) {
    return (
      <Layout style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={MD2Colors.tealA700} animating />
      </Layout>
    );
  }

  if (!dictionary || error) {
    return (
      <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="bodyLarge" style={{ color: MD2Colors.grey900 }}>
          {error}
        </Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView>
        {(Object.keys(medicalTest) as Array<keyof typeof medicalTest>).flatMap(
          (key, index) =>
            medicalTest[key] === 0 ? (
              []
            ) : (
              <>
                <TestRow
                  key={`${key}_${index}`}
                  status="normal"
                  label={dictionary[key].description}
                  value={medicalTest[key]}
                />
                <Divider style={{ marginHorizontal: 10 }} />
              </>
            )
        )}
      </ScrollView>
    </Layout>
  );
};

export default MedicalTest;
