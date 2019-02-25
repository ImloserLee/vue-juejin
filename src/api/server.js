import axios from 'axios'
/**
 * @params method {string} 方法名
 * @params url {string} 请求地址
 * @params params {object} get方式传参
 * @params data {object} post方式传参
 */
export default class Server {
  axios (method, url, params, headers) {
    return new Promise((resolve, reject) => {
      if (typeof params !== 'object') params = {}
      if (typeof headers !== 'object') headers = {}
      let _options = {
        method,
        url,
        timeout: 30000,
        params: null,
        data: null,
        headers: {
          'X-Juejin-Src': 'ios',
          ...headers
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300
        },
        ...params
      }
      axios.request(_options).then(res => {
        resolve(res)
      }, error => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
    })
  }
}