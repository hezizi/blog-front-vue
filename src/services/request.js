/**
 * axios请求封装
 * @param url 请求接口路径
 * @param data 请求参数
 * @method getRequest get请求
 * @method postRequest post请求
 */

import { fetchData } from './fetch'

export const getRequest = (url, data) => fetchData(url, 'get', data)   // get请求
export const postRequest = (url, data) => fetchData(url, 'post', data) // post请求