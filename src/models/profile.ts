import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import { resetState, setState } from '../redux/utils';
import { IProfile } from '../types/profile';

interface IState {
  isAuth: boolean;
  profile: IProfile | null;
}

const initialState: IState = {
  isAuth: true,
  profile: {
    id: '123-123-w43-1234',
    firstName: 'Артем',
    lastName: 'Верхоланцев',
    birthday: '1992-03-01T00:00:00.000Z',
    gender: 'man',
  },
};

export const profile = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState),
  },
});
