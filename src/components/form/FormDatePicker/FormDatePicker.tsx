import React, { FC, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import styled from 'styled-components/native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { Pressable } from 'react-native';

interface IFormDatePickerProps
  extends Omit<TextInputProps, 'value' | 'error' | 'mode' | 'onChangeText'> {
  name: string;
  helperText?: string;
}

const StyledView = styled.View`
  width: 100%;
  gap: 4px;
`;

export const FormDatePicker: FC<IFormDatePickerProps> = ({
  name,
  helperText,
  ...props
}) => {
  const [hasDate, setHasDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { control } = useFormContext();

  const {
    field: { value, onChange: onChangeController },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const onChangeTextInner = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    const newDate = date && DateTime.fromJSDate(date);
    onChangeController(newDate);
    setShowDatePicker(false);
    if (!hasDate) {
      setHasDate(true);
    }
  };

  const hasError = !!error;

  const helperTextInner = hasError ? error.message : helperText;

  const date = (value as DateTime) || DateTime.now().minus({ years: 18 });

  useEffect(() => {
    if (value) {
      setHasDate(true);
    }
  }, []);

  return (
    <StyledView>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <TextInput
          mode="outlined"
          value={hasDate ? date.toLocaleString(DateTime.DATE_SHORT) : ''}
          error={hasError}
          editable={false}
          right={
            <TextInput.Icon
              icon="calendar-month"
              onPress={() => setShowDatePicker(true)}
            />
          }
          {...props}
        />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date.toJSDate()}
          onChange={onChangeTextInner}
          locale="ru-Ru"
        />
      )}
      {helperTextInner && (
        <HelperText type={hasError ? 'error' : 'info'}>
          {helperTextInner}
        </HelperText>
      )}
    </StyledView>
  );
};
