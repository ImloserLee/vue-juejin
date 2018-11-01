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
      meta: { keepAlive: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: _import_('search/Search'),
      meta: { keepAlive: true },
      children: [
        {
          path: 'searchdetail',
          meta: { keepAlive: true },
          component: _import_('searchdetail/SearchDetail')
        },
      ]
    },
    {
      path: '/boil',
      name: 'Boil',
      component: _import_('boilpoint/BoilPoint'),
      redirect: '/boil/recomment',
      meta: { keepAlive: true },
      children: [
        {
          path: 'topic',
          meta: { keepAlive: true },
          component: _import_('boilpoint/component/Topic')
        },
        {
          path: 'recomment',
          meta: { keepAlive: true },
          component: _import_('boilpoint/component/Recomment')
        },
        {
          path: 'dynamic',
          meta: { keepAlive: true },
          component: _import_('boilpoint/component/Dynamic')
        }
      ]
    },
    {
      path: '/brochure',
      name: 'Brochure',
      component: _import_('brochure/Brochure'),
      meta: { keepAlive: true },
      redirect: '/brochure/all',
      children: [
        {
          path: 'all',
          meta: { keepAlive: true },
          component: _import_('brochure/component/All')
        },
        {
          path: 'already',
          meta: { keepAlive: true },
          component: _import_('brochure/component/Already')
        },
      ]
    },
    {
      path: '/person',
      name: 'Person',
      meta: { keepAlive: true },
      component: _import_('person/Person')
    },
    {
      path: '/homepage',
      name: 'HomePage',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('homepage/HomePage')
    },
    {
      path: '/detail',
      meta: { keepAlive: true },
      component: _import_('detail/Detail')
    },
    {
      path: '/setting',
      name: 'Setting',
      meta: { requireAuth: true },
      component: _import_('setting/Setting')
    },
    {
      path: '/article',
      name: 'Article',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('article/Article')
    },
    {
      path: '/thumbs',
      name: 'Thumbs',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('thumbs/Thumbs')
    },
    {
      path: '/collection',
      name: 'Collection',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('collection/Collection')
    },
    {
      path: '/tag',
      name: 'Tag',
      meta: { requireAuth: true },
      component: _import_('tag/Tag')
    },
    {
      path: '/share',
      name: 'Share',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('share/Share')
    },
    {
      path: '/original',
      name: 'Original',
      meta: { requireAuth: true, keepAlive: true },
      component: _import_('original/Original')
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
