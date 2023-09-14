import { useStores } from '@/src/hooks/useStores';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button, Text } from 'react-native-paper';
import styled from 'styled-components/native';

const ProfileView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Header: FC = observer(() => {
  const { replace } = useRouter();
  const {
    profileStore: { logout, profileName, isLoading },
  } = useStores();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      replace('/auth');
    }
  };

  return (
    <ProfileView>
      <Text>{profileName}</Text>
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
});

export default Header;
