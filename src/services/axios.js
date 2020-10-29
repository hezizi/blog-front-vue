// import axios from 'axios'
import { message } from 'ant-design-vue'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})

instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response) {
    const { status, data: { message: msg } } = err.response
    message.error(`${status} ${msg}`, 2)
    if (status === 401) return err.response
  }
  return Promise.reject(err)
})

export default instance
