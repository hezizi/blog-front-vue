/**
 * 所有接口请求
 * getRequest get请求
 * postRequest post请求
 */

import { getRequest, postRequest } from './request'

/* 登录注册 */
export const login = data => postRequest('/user/login', data)
// export const register = data => postRequest('/register', data)

/* 文章 */
export const articleList = data => getRequest('/article/list', data)
export const articleDetail = data => getRequest(`/article/detail/${data}`)

/* 标签 */
export const tagList = data => getRequest('/tag/list', data)

/* 留言评论 */
export const comment = data => postRequest('/comment', data)
export const commentList = data => getRequest('/comment/list', data)
