import { FC } from 'react';
import { Tabs } from 'expo-router/tabs';
import styled from 'styled-components/native';
import TextSearchIcon from '@/assets/icons/text-box-search.svg';
import HistoryIcon from '@/assets/icons/history.svg';
import { MD2Colors } from 'react-native-paper';

const MainLayout: FC = () => {
  const tabBarLabelStyle = { top: -4 };

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{
        backgroundColor: MD2Colors.white,
        margin: 0,
        padding: 0,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Расшифровка',
          tabBarIcon: ({ color }) => (
            <TextSearchIcon width={24} height={24} color={color} />
          ),
          tabBarLabelStyle,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarIcon: ({ color }) => (
            <HistoryIcon width={24} height={24} color={color} />
          ),
          tabBarLabelStyle,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
