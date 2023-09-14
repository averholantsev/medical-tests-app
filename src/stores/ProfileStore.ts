import * as SecureStore from 'expo-secure-store';
import { makeAutoObservable, runInAction } from 'mobx';
import { IProfile } from '../types/profile';
import AuthService from '../services/AuthService';
import { IStoreStatus } from '../types/root';

export interface IProfileStore {
  isAuth: boolean;
  profile: IProfile | null;
  status: IStoreStatus;
}

export class ProfileStore implements IProfileStore {
  isAuth = false;
  profile: IProfile | null = null;
  status: IStoreStatus = 'init';

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get isLoading() {
    return this.status === 'pending';
  }

  get profileName() {
    return this.profile
      ? `${this.profile.firstName} ${this.profile.lastName}`
      : '';
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  async getProfile() {
    this.status = 'pending';
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        const response = await AuthService.getProfile();

        runInAction(() => {
          this.isAuth = true;
          this.profile = response.data;
          this.status = 'done';
        });

        return true;
      }
    } catch (error) {
      console.error('ProfileStore.getProfile', error);
      runInAction(() => {
        this.status = 'error';
      });

      return false;
    }
  }

  async logout() {
    this.status = 'pending';
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        await SecureStore.deleteItemAsync('accessToken');

        runInAction(() => {
          this.isAuth = false;
          this.profile = null;
          this.status = 'done';
        });

        return true;
      }
    } catch (error) {
      console.error('ProfileStore.logout', error);
      runInAction(() => {
        this.status = 'error';
      });

      return false;
    }
  }
}
