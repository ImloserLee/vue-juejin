import { Local } from 'utils/storage'
import API from 'api/api'
const user = {
  state: {
    isLogin: Local.get('isLogin') || false,
    auth: Local.get('auth') || ''
  },
  actions: {
    async login({commit}, params) {
      let data = await API.login(params)
      commit('LOGIN', data)
    },
    signOut({commit}, params) {
      commit('SIGN_OUT')
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
      state.auth = auth
      state.isLogin = true
      Local.set('auth', auth)
      Local.set('isLogin', true)
    },
    SIGN_OUT(state) {
      state.auth = ''
      state.isLogin = false
      Local.remove('auth')
      Local.remove('isLogin')
    }
  }
}
export default user