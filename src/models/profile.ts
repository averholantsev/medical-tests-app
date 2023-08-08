import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import { resetState, setState } from '../redux/utils';
import { IProfile } from '../types/profile';
import * as SecureStore from 'expo-secure-store';
import AuthService from '../services/AuthService';

interface IState {
  isAuth: boolean;
  profile: IProfile | null;
}

const initialState: IState = {
  isAuth: false,
  profile: null,
};

export const profile = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState),
  },
  effects: (d) => ({
    async getProfile() {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
          const response = await AuthService.getProfile();
          const profile = response.data;

          d.profile.setState({
            isAuth: true,
            profile,
          });

          return profile;
        } else {
          return null;
        }
      } catch (error) {
        console.error('getProfile', error);
        return null;
      }
    },

    async logout() {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
          await SecureStore.deleteItemAsync('accessToken');

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('logout', error);
        return false;
      }
    },
  }),
});
