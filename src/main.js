// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //导入路由
import axios from 'axios'//导入axios方法，用于跨域访问
import Element from 'element-ui' //导入element-ui库
import 'element-ui/lib/theme-chalk/index.css' //导入element-ui库的css
import VueCookie from 'vue-cookie' //导入Vue 自带的cookie管理库
import  store  from './store' //导入store，该文件中包含对一些自定义变量的操作
Vue.use(VueCookie) //使用VueCookie组件
Vue.use(Element)  //使用Element组件
Vue.prototype.$axios = axios // 在原型上定义axios以在每一个组件上使用
axios.defaults.baseURL = '/api' //定义axios的初始url

new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
})




