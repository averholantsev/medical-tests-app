import axios, { AxiosRequestConfig } from 'axios';

function requestInterceptor(config: AxiosRequestConfig) {
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
