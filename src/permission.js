// import router from './router'
//
// //路由判断登录 根据路由配置文件的参数
// router.beforeEach(( to, from, next) =>{
//   if(to.matched.some(record => record.meta.requiredAuth)){
//     if(getToken()){
//       if(to.path === '/auth'){
//         removeToken()
//         window.location.reload()
//       }else{
//         next()
//       }
//     }else{
//       next({
//         path: '/auth',
//         query:{redirect: to.fullPath}
//       })
//     }
//   }else{
//     next()
//   }
// })
//
//
