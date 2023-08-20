import React, { FC, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '../redux/utils';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const HomeLayout: FC = () => {
  const {
    profile: { getProfile },
  } = useAppDispatch();
  const { replace } = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
    getProfile()
      .then((data) => {
        if (!data) {
          replace('/auth');
        } else {
          replace('/(main)');
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <Wrapper>
      {isLoading && (
        <ActivityIndicator size="large" color={MD2Colors.tealA700} animating />
      )}
    </Wrapper>
  );
};

export default HomeLayout;
