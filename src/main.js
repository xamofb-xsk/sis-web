// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import qs from 'querystring'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookie from 'vue-cookie'
// import {setCookie,getCookie,delCookie} from './utils/utils.js'
import  store  from './store'

Vue.use(VueCookie)

Vue.use(Element)

Vue.prototype.qs = qs
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})




