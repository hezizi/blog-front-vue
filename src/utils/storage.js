import Cookie from 'js-cookie'

// 存
const expires = new Date(new Date().getTime() + 10 * 60 * 1000)  // 10min
export const setStorage = (key, val) => {
  Cookie.set(key, val instanceof Object ? JSON.stringify(val) : val, expires)
}

// 取
export const getStorage = key => {
  const val = Cookie.get(key)
  if (val) {
    return val.startsWith('{') || val.startsWith('[') ? JSON.parse(val) : val
  }
}

// 删除
export const removeStorage = key => {
  // localStorage.removeItem(key)
  Cookie.remove(key)
}