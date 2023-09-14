import { useContext } from 'react';
import { RootStore } from '@/src/stores/RootStore';
import { StoreContext } from '@/src/stores/Context';

export const useStores = (): RootStore => useContext(StoreContext);
