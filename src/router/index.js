import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/layout/index'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/views',
      name: 'home',
      component: home,
      children: [
        {
          path: '/views/table',
          name: 'table',
          component: ()=>import('@/views/table/index')
        },
        {
          path: '/views/form',
          name: 'form',
          component: ()=>import('@/views/form/index')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index')
    }
  ]
})
