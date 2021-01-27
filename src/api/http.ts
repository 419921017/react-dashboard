import axios, { AxiosRequestConfig } from 'axios'

export const baseUrl = process.env.BASE_URL || 'http://localhost:3300'

export interface IResponseData {
  code: number
}

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.log(error, '网络错误')
    return Promise.reject(error)
  },
)

export const get = (url: string, config?: AxiosRequestConfig | undefined) => {
  return axios.get<any, IResponseData>(url, config)
}

export const post = (url: string, data?: any, config?: AxiosRequestConfig | undefined) => {
  return axios.post<any, IResponseData>(url, data, config)
}

export default axios
