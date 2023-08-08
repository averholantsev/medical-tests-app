import { AxiosInstance } from 'axios';
import instance from './axiosInstance';
import { IProfile } from '../types/profile';

class AuthService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public login(data: ILoginData) {
    return this.instance.post<IToken>('/login', data);
  }

  public getProfile() {
    return this.instance.get<IProfile>('/profile');
  }
}

export default new AuthService();
