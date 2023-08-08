import React, { FC, useRef, useState } from 'react';
import { LayoutRectangle } from 'react-native';
import { Text, MD2Colors } from 'react-native-paper';
import styled from 'styled-components/native';

interface ILineChartProps {
  measureMin: number;
  measureMax: number;
  value: number;
}

const Wrapper = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const Line = styled.View`
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background-color: ${MD2Colors.blueGrey100};
  position: relative;
`;

const Measure = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${MD2Colors.tealA700};
  position: absolute;
  top: -4px;
`;

const LineChart: FC<ILineChartProps> = ({ measureMin, measureMax, value }) => {
  const [rect, setRect] = useState<LayoutRectangle | null>(null);
  const measurePosition = rect?.width
    ? Math.floor((value * rect.width) / measureMax)
    : measureMin;

  console.log(value, measureMax, rect?.width, measurePosition);

  return (
    <Wrapper>
      <Line
        onLayout={(event) => {
          setRect(event.nativeEvent.layout);
        }}
      >
        <Measure style={{ left: measurePosition }} />
      </Line>
    </Wrapper>
  );
};

export default LineChart;
