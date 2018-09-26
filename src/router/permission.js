import { router } from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.isLogin) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router