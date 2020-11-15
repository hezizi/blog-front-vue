import axios from 'axios'
import { showMessage } from '@/utils'

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
    const { status, data: { message: msg }, statusText } = err.response
   
    if (status === 401) return err.response
    else showMessage('error', `Code: ${status} ${msg || statusText}`)
  }
  return Promise.reject(err)
})

export default instance
