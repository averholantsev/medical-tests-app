import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import styled from 'styled-components/native';

interface IFormTextFieldProps
  extends Omit<TextInputProps, 'value' | 'error' | 'mode'> {
  name: string;
  helperText?: string;
}

const StyledView = styled.View`
  width: 100%;
  gap: 4px;
`;

export const FormTextField: FC<IFormTextFieldProps> = ({
  name,
  onChangeText,
  helperText,
  ...props
}) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange: onChangeController },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const onChangeTextInner = (value: string) => {
    onChangeText?.(value);
    onChangeController(value);
  };

  const hasError = !!error;

  const helperTextInner = hasError ? error.message : helperText;

  return (
    <StyledView>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeTextInner}
        error={hasError}
        {...props}
      />
      {helperTextInner && (
        <HelperText type={hasError ? 'error' : 'info'}>
          {helperTextInner}
        </HelperText>
      )}
    </StyledView>
  );
};
