import { FC } from 'react';
import { MD2Colors, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import { IMedicalDictionary } from '@/src/types/medical-test';
import LineChart from '../LineChart/LineChart';

interface ITestRowProps {
  status: 'normal' | 'warning' | 'danger';
  dictionary: IMedicalDictionary;
  value: number;
}

const Wrapper = styled.View`
  padding: 10px;
  gap: 10px;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const TestRow: FC<ITestRowProps> = ({ dictionary, value }) => {
  const { description, measureLabMin, measureLabMax } = dictionary;

  return (
    <Wrapper>
      <TextWrapper>
        <Text
          variant="bodyMedium"
          style={{ color: MD2Colors.blueGrey700, maxWidth: 270 }}
        >
          {description}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: MD2Colors.grey900, fontWeight: '800' }}
        >
          {value}
        </Text>
      </TextWrapper>
      <LineChart
        measureMin={measureLabMin}
        measureMax={measureLabMax}
        value={value}
      />
    </Wrapper>
  );
};

export default TestRow;
