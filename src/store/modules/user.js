import { Local } from 'utils/storage'
import API from 'api/api'
const user = {
  state: {
    isLogin: Local.get('isLogin') || false,
    auth: Local.get('auth') || null
  },
  actions: {
    async login({commit}, params) {
      let data = await API.login(params)
      commit('LOGIN', data)
    }
  },
  mutations: {
    LOGIN(state, data) {
      let res = data.data
      let auth = {
        device_id: res.clientId,
        token: res.token,
        uid: res.userId,
        current_uid: res.userId
      }
      Local.set('auth', auth)
      Local.set('isLogin', true)
      state.auth = auth
      state.isLogin = true
    }
  }
}
export default user