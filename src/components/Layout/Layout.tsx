import { FC, PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface ILayout {
  className?: string;
  style?: ViewStyle;
}

const StyledSafeAreaView = styled.SafeAreaView`
  margin: 16px 16px 32px;
  flex: 1;
`;

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, style }) => {
  return <StyledSafeAreaView style={style}>{children}</StyledSafeAreaView>;
};

export default Layout;
