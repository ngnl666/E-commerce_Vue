import Vue from 'vue'
// 把 event bus 直接掛載在 Vue 的原型下
Vue.prototype.$bus = new Vue();