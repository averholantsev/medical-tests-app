import { Layout } from '@/src/components';
import React, { FC } from 'react';
import { LoginForm } from '@/src/views/LoginForm/LoginForm';

const Auth: FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Auth;
