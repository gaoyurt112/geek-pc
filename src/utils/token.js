const key = 'pc-geek'

const getToken = () => {
  return window.localStorage.getItem(key)
}

const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}

const clearToken = () => {
  return window.localStorage.removeItem(key)
}

export { getToken, setToken, clearToken }