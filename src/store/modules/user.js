import { Local } from 'utils/storage'
import API from 'api/api'
const user = {
  state: {
    isLogin: false,
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
        token: res.token,
        uid: res.userId
      }
      Local.set('auth', auth)
    },
    mylogin(state) {
      state.isLogin = true
    }
  }
}
export default user