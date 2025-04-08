import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { config } from '../appConfig';
import { clearLocalStorage, getItemFromLocalStorage } from './localStorage';
import { storageConstants } from '../../constants';

const API: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  async (axiosConfig) => {
    const token = await getItemFromLocalStorage(storageConstants.sessionKey);
    if (token && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data;
  },
  async (error: any) => {
    if (error?.response?.data?.message === 'Unauthorized User') {
      clearLocalStorage();
      // message.error('Session expired')
      return;
    }
    return Promise.reject(error?.response?.data || 'Error occured');
  }
);

export { API };
