import { Layout } from '@/src/components';
import { useAppSelector } from '@/src/redux/utils';
import { useNavigation } from 'expo-router';
import React, { FC, useLayoutEffect } from 'react';
import { Text } from 'react-native';

const MedicalTest: FC = () => {
  const medicalTest = useAppSelector((s) => s.medicalTest);

  console.log('MedicalTest', medicalTest);

  return (
    <Layout>
      <Text>MedicalTest</Text>
      <Text>Тромбоциты: {medicalTest.result.trombocity}</Text>
    </Layout>
  );
};

export default MedicalTest;
