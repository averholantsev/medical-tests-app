import { AxiosInstance } from 'axios';
import instance from './axiosInstance';
import { IProfile } from '../types/profile';
import { ISignupData, ILoginData, IToken } from '@/src/types/auth';

class AuthService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public login(data: ILoginData) {
    return this.instance.post<IToken>('/login', data);
  }

  public signup(data: ISignupData) {
    return this.instance.post<IToken>('/signup', data);
  }

  public getProfile() {
    return this.instance.get<IProfile>('/profile');
  }
}

export default new AuthService();
