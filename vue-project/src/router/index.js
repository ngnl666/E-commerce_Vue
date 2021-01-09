// router 配置
import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', // 若在網址後方輸入不存在的頁面網址則回到登入頁面
      redirect: '/login',
    },
    // {
    //   path: '/', // 首頁
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/login', // 登入頁(路徑盡量小寫)
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin', // 後台
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products', // 產品頁(需驗證才能進入)
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ],
    },
  ]
})
