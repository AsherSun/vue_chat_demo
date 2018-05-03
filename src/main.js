// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils'
import './assets/scss/reset.scss'
import Alert from '@/components/Alert'
Vue.config.productionTip = false

Vue.prototype.$utils = utils
utils.rem(7.5)
Vue.use(Alert)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
