import { FC, ReactElement, ReactNode, createContext } from 'react';
import { IRootStoreModel } from '@/src/types/root';

export const StoreContext = createContext<IRootStoreModel>(
  {} as IRootStoreModel
);

export type IStoreComponent = FC<{
  store: IRootStoreModel;
  children: ReactNode;
}>;

export const StoreProvider: IStoreComponent = ({
  store,
  children,
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
