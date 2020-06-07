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

  return axios(httpOpts)
    .then(res => res.data)
    .catch(() => null)
}