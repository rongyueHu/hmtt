import store from '@/store'
import axios from 'axios' // 导入axios
const instance = axios.create({ // 创建axios实例instance
  baseURL: 'http://toutiao.itheima.net/v1_0', // 基础接口
  timeout: 5000 // 响应时间5s，超出报错
})
export default instance // 导出axios实例
// 请求拦截器：一堆ajax请求配置项都要做的事情，就可以提取到请求拦截器，只需要写一次
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.state.user.token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
