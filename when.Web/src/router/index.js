import Vue from 'vue'
import Router from 'vue-router'
import Games from '@/components/Games'
import ChangeUsername from '@/components/ChangeUsername'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Games
    },
    {
      path: '/username',
      name: 'ChangeUsername',
      component: ChangeUsername
    }
  ]
})
