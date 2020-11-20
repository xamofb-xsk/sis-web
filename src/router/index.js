import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Main_Teacher from "../components/Main_Teacher";

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
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/activity',
    //   name: 'ActivityPublish',
    //   component: ActivityPublish
    // },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        required: true
      }
    },
    {
      path: '/manager',
      name: 'main_teacher',
      component: Main_Teacher,
    }
    ,
  ]
})
router.beforeEach((to, from, next)=> {
  if (to.path === '/') {
    sessionStorage.removeItem("token")
  }
  let token = sessionStorage.getItem("token");
  if (!token && to.path !== "/"){
    next({path: "/"});
  }else{
    next();
  }
});
export default router;
