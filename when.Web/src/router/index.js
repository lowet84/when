import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ChangeUsername from '@/components/ChangeUsername'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/username',
      name: 'ChangeUsername',
      component: ChangeUsername
    }
  ]
})
