import { FC, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '..';

interface ILayout {
  className?: string;
  style?: ViewStyle;
  showHeader?: boolean;
}

const StyledSafeAreaView = styled.SafeAreaView`
  margin: 16px 16px 32px;
  flex: 1;
  gap: 8px;
`;

const Layout: FC<PropsWithChildren<ILayout>> = ({
  children,
  style,
  showHeader,
}) => {
  return (
    <StyledSafeAreaView style={style}>
      {showHeader && <Header />}
      {children}
    </StyledSafeAreaView>
  );
};

export default Layout;
