import Cookie from 'js-cookie'

// 存
const expires = new Date(new Date().getTime() + 5 * 60 * 1000)  // 5min
export const setStorage = (key, val) => {
  Cookie.set(key, val instanceof Object ? JSON.stringify(val) : val, { expires })
}

// 取
export const getStorage = key => {
  const val = Cookie.get(key)
  if (val) {
    return val.startsWith('{') || val.startsWith('[') ? JSON.parse(val) : val
  }
}

// 删
export const removeStorage = key => {
  Cookie.remove(key)
}
