import axios from 'axios'

export type APIResponse = [null, any] | [Error]

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/'
})
