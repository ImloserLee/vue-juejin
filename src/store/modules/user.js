import { Local } from 'utils/storage'
const user = {
  state: {
    isLogin: false,
    auth: {
      src: 'web',
      uid: Local.get('uid') || '',
      device_id: Local.get('device_id') || '',
      client_id: Local.get('client_id') || '',
      token: Local.get('token') || '',
      category: 'all',
      recomment: 1,
      limit: 20
    }
  },
  actions: {
    login({commit}) {
      commit('LOGIN')
    }
  },
  mutations: {
    LOGIN(state) {
      /* this.state.auth.token = 'eyJhY2Nlc3NfdG9rZW4iOiJkcjlXYzJrSEJsQkVqSkhxIiwicmVmcmVzaF90b2tlbiI6ImdYTURuY0g1QjVWUUFUM1UiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ=='
      this.state.auth.uid = '58528c008e450a006c8a1e09'
      this.state.auth.device_id = '1536999738896'
      this.state.auth.client_id = '1536999738896' */
      Local.set('token', 'eyJhY2Nlc3NfdG9rZW4iOiJkcjlXYzJrSEJsQkVqSkhxIiwicmVmcmVzaF90b2tlbiI6ImdYTURuY0g1QjVWUUFUM1UiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ')
    }
  }
}
export default user