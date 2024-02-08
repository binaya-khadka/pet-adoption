import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { config } from '../appConfig'


const API: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})


export { API }