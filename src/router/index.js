import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Main_Teacher from "../components/Main_Teacher";

Vue.use(Router)
var router = new Router({
  mode: 'history',
  routes: [ //路由表，里面定义了三个页面
    {
      path: '/', //路径
      name: 'Login', //名称
      component: Login //对应的页面
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    {
        path: '/manager',
      name: 'main_teacher',
      component: Main_Teacher,
    }
    ,
  ]
})
export default router;
