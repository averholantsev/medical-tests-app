import axios, { AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const HEADER_AUTH_TOKEN = 'Authorization';

async function requestInterceptor(config: AxiosRequestConfig) {
  const accessToken = await SecureStore.getItemAsync('accessToken');

  if (config.headers && accessToken) {
    config.headers[HEADER_AUTH_TOKEN] = `Bearer ${accessToken}`;
  }

  console.log(config);
  return config;
}

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => requestInterceptor(config) as any
);

export default instance;
