import { Layout, TestRow } from '@/src/components';
import { useStores } from '@/src/hooks/useStores';
import { observer } from 'mobx-react-lite';
import React, { FC, Fragment, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Divider,
  MD2Colors,
  Text,
} from 'react-native-paper';

const MedicalTest: FC = observer(() => {
  const {
    medicalTestStore: { getDictionary, isLoading, dictionary, result, error },
  } = useStores();

  useEffect(() => {
    getDictionary();
  }, []);

  if (isLoading) {
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
        {(Object.keys(result) as Array<keyof typeof result>).map(
          (key, index) => (
            <Fragment key={`${key}_${index}`}>
              <TestRow
                status="normal"
                dictionary={dictionary[key]}
                value={result[key]}
              />
              <Divider style={{ marginHorizontal: 10 }} />
            </Fragment>
          )
        )}
      </ScrollView>
    </Layout>
  );
});

export default MedicalTest;
