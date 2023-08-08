import { AxiosInstance } from 'axios';
import instance from './axiosInstance';

class AuthService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public login(data: ILoginData) {
    return this.instance.post<IToken>('/login', data);
  }
}

export default new AuthService();
