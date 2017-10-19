// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Api from './api'
import { setAccessToken, setIdToken, login } from './auth'

Vue.config.productionTip = false

let init = async function () {
  if (window.location.hash.startsWith('#/access_token')) {
    await setAccessToken()
    await setIdToken()
    window.location.href = '/'
  }

  let data = await Api('loginState')
  if (data.loginState === 'NOT_LOGGED_IN') {
    login()
  } else if (data.loginState === 'NO_USERNAME') {
    window.location.href = '/#/username'
  }

  if (data.user !== null) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
}

init()
