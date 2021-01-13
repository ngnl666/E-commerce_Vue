// router 配置
import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrders from '@/components/pages/CustomerOrders'
import Coupons from '@/components/pages/Coupons'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', // 若在網址後方輸入不存在的頁面網址則回到登入頁面
      redirect: '/login',
    },
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
        {
          path: 'coupons', // 產品頁(需驗證才能進入)
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/', // 與上方不同路徑卻顯示同一個元件會跳出錯誤，在配置路由時盡量避免這種情況發生
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_orders', // 模擬訂單頁
          name: 'CustomerOrders',
          component: CustomerOrders,
        },
      ],
    },
  ]
})
