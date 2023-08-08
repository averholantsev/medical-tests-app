import { Layout } from '@/src/components';
import { RegistrationForm } from '@/src/views/RegistrationForm/RegistrationForm';
import { FC } from 'react';
import { ScrollView } from 'react-native';

const Registation: FC = () => {
  return (
    <Layout>
      <ScrollView>
        <RegistrationForm />
      </ScrollView>
    </Layout>
  );
};

export default Registation;
