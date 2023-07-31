import axios, { type AxiosInstance } from 'axios'

export type APIResponse = [null, any] | [Error]

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER
})
