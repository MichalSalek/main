import Cookies from 'js-cookie'
// https://www.npmjs.com/package/js-cookie


export const getClientCookie = (name: string) => {
  return Cookies.get(name) ?? null
}
