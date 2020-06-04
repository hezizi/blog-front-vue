/**
 * get post请求封装
 * @returns result.data 返回请求结果的data属性值
 */

import axios from './axios'

export const fetchData = async (url, method, data = {}) => {
  let httpOpts = { url, method }
  httpOpts = method === 'get' ? { ...httpOpts, params: data } : { ...httpOpts, data }
  // try {
  //   const result = await axios(httpOpts)
  //   return result.data
  // } catch (error) {
  //   return null
  // }

  return axios(httpOpts).then(res => {
    return res.data
  }).catch(err => {
    // 此处返回Promise.reject()的话，需要在组件中接收时使用promise的catch或try catch捕获异常
    // return Promise.reject(err) 
    
    return null   // 避免组件中使用到try catch或promise来捕获异常，我们这就直接返回null，在结果判断上更好处理
  })
}