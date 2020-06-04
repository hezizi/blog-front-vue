/**
 * 所有接口请求
 * getRequest get请求
 * postRequest post请求
 */

import { getRequest, postRequest } from './request'

/* 登录注册 */
// export const login = data => postRequest('/login', data)
// export const register = data => postRequest('/register', data)

/* 文章 */
export const articleList = data => getRequest('/article/list', data)   // 列表
export const articleDetail = data => getRequest(`/article/detail/${data}`)   // 详情

/* 标签 */
export const tagList = data => getRequest('/tag/list', data)  // 列表