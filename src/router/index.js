import Vue from 'vue'
import Router from 'vue-router'
const _import_ = file => () => import('pages/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        slide: 2
      },
      component: _import_('home/Home')
    },
    {
      path: '/search',
      name: 'Search',
      component: _import_('search/Search')
    },
    {
      path: '/boil',
      name: 'Boil',
      component: _import_('boilpoint/BoilPoint')
    },
    {
      path: '/brochure',
      name: 'Brochure',
      component: _import_('brochure/Brochure')
    },
    {
      path: '/person',
      name: 'Person',
      component: _import_('person/Person')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        slide: 1
      },
      component: _import_('login/Login')
    },
    {
      path: '/',
      redirect: '/home',
      component: _import_('home/Home')
    }
  ]
})
