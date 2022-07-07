import axios from 'axios'
import { clearToken, getToken } from '@/utils/token'
import { history } from './history'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  //接收token
  const token = getToken()
  //如果token存在自动拼接token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.dir(error)
  //跳回到登录reactRouter默认状态下 并不支持在组件之外进行路由跳转
  if (error.response.status === 401) {
    //删除token
    clearToken()
    //跳转到登录页
    history.push('/login')
  }

  return Promise.reject(error)
})

export { http }