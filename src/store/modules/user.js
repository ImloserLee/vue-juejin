import { Local } from 'utils/storage'
import API from 'api/api'
const user = {
  state: {
    isLogin: Local.get('auth') ? true : false,
    auth: Local.get('auth')
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
        client_id: res.clientId,
        device_id: res.clientId,
        token: res.token,
        uid: res.userId,
        current_uid: res.userId
      }
      Local.set('auth', auth)
    }
  }
}
export default user