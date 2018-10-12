import { Local } from 'utils/storage'
const getters = {
  auth: (state) => {
    if (!state.user.auth) {
      state.user.auth = Local.get('auth')
    }
    return state.user.auth
  },
  isLogin: (state) => {
    if (!state.user.isLogin) {
      state.user.isLogin = Local.get('isLogin')
    }
    return state.user.isLogin
  }
}

export default getters