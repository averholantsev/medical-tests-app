import React, { FC, useEffect } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import styled from 'styled-components/native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import { useStores } from '../hooks/useStores';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const HomeLayout: FC = observer(() => {
  const { replace } = useRouter();
  const {
    profileStore: { isLoading, getProfile },
  } = useStores();

  useEffect(() => {
    getProfile().then((data) => {
      if (!data) {
        replace('/auth');
      } else {
        replace('/(main)');
      }
    });
  }, []);

  return (
    <Wrapper>
      {isLoading && (
        <ActivityIndicator size="large" color={MD2Colors.tealA700} animating />
      )}
    </Wrapper>
  );
});

export default HomeLayout;
