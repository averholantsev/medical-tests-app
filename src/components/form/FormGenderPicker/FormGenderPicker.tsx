import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Pressable } from 'react-native';
import {
  MD2Colors,
  Surface,
  SurfaceProps,
  Text,
  HelperText,
} from 'react-native-paper';
import styled from 'styled-components/native';
import ManIcon from '@/assets/icons/face-man.svg';
import WomanIcon from '@/assets/icons/face-woman.svg';

interface IFormGenderPickerProps {
  name: string;
}

const StyledContainer = styled.View`
  gap: 4px;
`;

const StyledView = styled.View`
  min-height: 80px;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
`;

const StyledSurface = styled(Surface)<
  SurfaceProps & { selected: boolean; error: boolean }
>`
  height: 80px;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border: ${({ selected, error }) =>
    selected
      ? `2px solid ${MD2Colors.deepPurple800}`
      : error
      ? `2px solid ${MD2Colors.red900}`
      : `1px solid ${MD2Colors.grey700}`};
`;

export const FormGenderPicker: FC<IFormGenderPickerProps> = ({ name }) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const onChangeInner = (type: string) => () => {
    onChange(type);
  };

  const hasError = !!error;

  return (
    <StyledContainer>
      <StyledView>
        <Pressable onPress={onChangeInner('man')} style={{ flex: 1 }}>
          <StyledSurface
            mode="flat"
            selected={value === 'man'}
            error={hasError}
          >
            <Text variant="labelSmall" style={{ textAlign: 'center' }}>
              Мужчина
            </Text>
            <ManIcon width={32} height={32} />
          </StyledSurface>
        </Pressable>
        <Pressable onPress={onChangeInner('woman')} style={{ flex: 1 }}>
          <StyledSurface
            mode="flat"
            selected={value === 'woman'}
            error={hasError}
          >
            <Text variant="labelSmall" style={{ textAlign: 'center' }}>
              Женщина
            </Text>
            <WomanIcon width={32} height={32} />
          </StyledSurface>
        </Pressable>
      </StyledView>
      {hasError && <HelperText type="error">{error?.message}</HelperText>}
    </StyledContainer>
  );
};
