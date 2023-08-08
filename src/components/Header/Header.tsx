import { useAppDispatch, useAppSelector } from '@/src/redux/utils';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Button, Text } from 'react-native-paper';
import styled from 'styled-components/native';

const ProfileView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Header: FC = () => {
  const { replace } = useRouter();
  const {
    profile: { logout },
  } = useAppDispatch();
  const { name, isLoading } = useAppSelector((s) => ({
    name: `${s.profile.profile?.firstName} ${s.profile.profile?.lastName}`,
    isLoading: s.loading.effects.profile.logout,
  }));

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      replace('/auth');
    }
  };

  return (
    <ProfileView>
      <Text>{name}</Text>
      <Button
        icon="logout"
        onPress={handleLogout}
        loading={isLoading}
        disabled={isLoading}
      >
        Выйти
      </Button>
    </ProfileView>
  );
};

export default Header;
