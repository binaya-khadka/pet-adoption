import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { config } from '../appConfig'
import { clearLocalStorage } from './localStorage'

const API: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data
  },
  async (error: any) => {
    if (error?.response?.data?.message === 'Unauthorized User') {
      clearLocalStorage()
      // message.error('Session expired')
      return
    }
    return Promise.reject(error?.response?.data || 'Error occured')
  },
)

export { API }