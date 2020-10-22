import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next)=> {
  if (to.path === '/login') {
    window.hideLogin = false;
  }
  next();
})
export default router;
