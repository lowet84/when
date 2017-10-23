import Vue from 'vue'
import Router from 'vue-router'
import Games from '@/components/Games'
import ChangeUsername from '@/components/ChangeUsername'
import Play from '@/components/Play'
import Summary from '@/components/Summary'

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
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
    }
  ]
})
