import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 60000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers && !config.headers['Content-Type'] && (config.headers['Content-Type'] = 'application/json')
    return config
  },
  (error) => {
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const { code, msg } = response.data
    if (code != 200) {
      ElMessage.error(msg)
    }
    return response
  },
  (error) => {
    ElMessage.error('后端服务出现故障')
    return Promise.reject(error)
  }
)

class Requests {
  constructor(private readonly instance: AxiosInstance) {}
  request<T = any>(config: AxiosRequestConfig): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result<T>>>(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    })
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      url,
      data,
      method: 'POST',
      ...config,
    })
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      url,
      data,
      method: 'PUT',
      ...config,
    })
  }
  delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({
      ...config,
      url,
      data,
      method: 'DELETE',
    })
  }
}

export default new Requests(instance)
