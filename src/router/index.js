import Vue from 'vue'
import Router from 'vue-router'
const _import_ = file => () => import('pages/' + file + '.vue')

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: _import_('home/Home'),
      children: [
        {
          path: 'detail',
          component: _import_('detail/Detail')
        },
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: _import_('search/Search'),
      children: [
        {
          path: 'detail',
          component: _import_('detail/Detail')
        },
      ]
    },
    {
      path: '/boil',
      name: 'Boil',
      component: _import_('boilpoint/BoilPoint'),
      redirect: '/boil/recomment',
      children: [
        {
          path: 'topic',
          component: _import_('boilpoint/component/Topic')
        },
        {
          path: 'recomment',
          component: _import_('boilpoint/component/Recomment')
        },
        {
          path: 'dynamic',
          component: _import_('boilpoint/component/Dynamic')
        }
      ]
    },
    {
      path: '/brochure',
      name: 'Brochure',
      component: _import_('brochure/Brochure'),
      redirect: '/brochure/all',
      children: [
        {
          path: 'all',
          component: _import_('brochure/component/All')
        },
        {
          path: 'already',
          component: _import_('brochure/component/Already')
        },
      ]
    },
    {
      path: '/person',
      name: 'Person',
      component: _import_('person/Person')
    },
    {
      path: '/homepage',
      name: 'HomePage',
      meta: { requireAuth: true },
      component: _import_('homepage/HomePage')
    },
    {
      path: '/setting',
      name: 'Setting',
      meta: { requireAuth: true },
      component: _import_('setting/Setting')
    },
    {
      path: '/login',
      name: 'Login',
      component: _import_('login/Login')
    },
    {
      path: '/',
      redirect: '/home',
      component: _import_('home/Home')
    }
  ]
})
