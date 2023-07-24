import React, { FC, PropsWithChildren } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

const Root: FC = () => {
  return <PaperProvider>{<Slot />}</PaperProvider>;
};

export default Root;
