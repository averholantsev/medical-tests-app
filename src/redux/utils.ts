import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IDispatch, IRootState } from './store';

export function setState<T>(state: T, payload: Partial<T>): T {
  return { ...state, ...payload };
}

export function resetState<T>(initialState: T): () => T {
  return function (): T {
    return { ...initialState };
  };
}

export const useAppDispatch = useDispatch<IDispatch>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
