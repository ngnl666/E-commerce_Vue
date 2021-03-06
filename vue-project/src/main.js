// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 第三方套件往上放
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// import VueI18n from 'vue-i18n' // VueI18n 多國語系
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'; // 導入 vee-validate
import TW from 'vee-validate/dist/locale/zh_TW.json' // 導入 vee-validate 的中文語系
import * as rules from 'vee-validate/dist/rules'; // 導入 vee-validate 的規則

import 'bootstrap'
import $ from 'jquery'; 
window.$ = $; // 全域設定 jquery

// 再來是本地的 import
import App from './App'
import router from './router'
import './bus'    
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// axios.defaults.withCredentials = true; // 前端 axios 請求附帶 Cookies 來處理跨域(現今不需開啟，因為是使用 token 做驗證)

Vue.component('Loading', Loading); // 全域註冊 component
Vue.filter('currency', currencyFilter); // 全域註冊 filter
Vue.filter('date', dateFilter); // 全域註冊 filter

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Object.keys(rules).forEach((rule) => { // 一一導出規則
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver); // 針對表單驗證的元件
Vue.component('ValidationProvider', ValidationProvider); // 針對 input 驗證的元件

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

// 直接寫在 main.js 是因為全域都需要用到(檢查是否登入跳轉)
router.beforeEach((to, from, next) => { // to: 到達的網頁 / from: 從哪邊跳轉的 / next: 放行
  console.log('to: ', to, '\nfrom: ', from, next);
  if(to.meta.requiresAuth){ // 如果此頁面需要驗證
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => { // 此處不能使用 this.$http 是因為這只適用於元件內
      console.log(response.data);
      if(response.data.success){
        next(); // 放行
      }else{
        next({
          path: '/login' // 跳轉至登入頁面
        });
      }      
    });
  }else{
    next();
  }
  
})
