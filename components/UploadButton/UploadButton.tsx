import { FC } from 'react';
import { Pressable } from 'react-native';

import styled from 'styled-components/native';

const ButtonContainer = styled.View<{ pressed: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${({ pressed }) => (pressed ? '#00A896' : '#02c39a')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
`;

interface IUploadButtonProps {
  title: string;
  onPress: () => void;
}

const UploadButton: FC<IUploadButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <ButtonContainer pressed={pressed}>
          <ButtonText>{title}</ButtonText>
        </ButtonContainer>
      )}
    </Pressable>
  );
};

export default UploadButton;
