import { FC } from 'react';
import { MD2Colors, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import CircleIcon from '@/assets/icons/circle-small.svg';

interface ITestRowProps {
  status: 'normal' | 'warning' | 'danger';
  label: string;
  value: number;
}

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  flex: 0 1 auto;
`;

const TestRow: FC<ITestRowProps> = ({ label, value }) => {
  return (
    <Wrapper>
      <TextContainer>
        <CircleIcon
          width={8}
          height={8}
          color={MD2Colors.greenA700}
          style={{ margin: 2, marginTop: 7 }}
        />
        <Text variant="bodyMedium" style={{ color: MD2Colors.blueGrey700 }}>
          {label}
        </Text>
      </TextContainer>
      <Text
        variant="bodyMedium"
        style={{ color: MD2Colors.grey900, fontWeight: '800' }}
      >
        {value}
      </Text>
    </Wrapper>
  );
};

export default TestRow;
