# CoffeeBean

![CoffeeBean](https://drive.google.com/file/d/1L_o7avH0fUe1sRN5dGfhz2JGnSEvE1gn/view?usp=sharing)

Demo: https://ngnl666.github.io/CoffeeBean/#/

## 簡介及專案架構 Introduction & Architecture

💻 使用 Vue.js 開發的咖啡電商網站

📍 前台 :
▪️ Home 首頁 : 網站介紹頁及咖啡特色介紹
▪️ Shop 商品頁 : 各式各樣商品，可進行分類篩選、加入購物車、加入我的收藏、商品細節導覽
▪️ DetailCard 商品詳細頁 : 單一商品細節，可選擇數量並加入購物車、顯示目前所在分類及下方商品推薦
▪️ Favorite 我的收藏 : 放置我的收藏商品，以及我的優惠券
▪️ Pick 抽卡系統 : 抽取優惠券並存放置我的收藏頁面
▪️ Cart 購物車 : 購物車系統，分為三個部分如下
├── CustomerCart : 檢視購物車內的商品，可進行數量更改與刪除
├── CustomerImformation : 個人資料填寫以及訂單確認
├── CustomerOrder : 訂單成立，進行付款

📍 後台 :
▪️ Login 登入系統 : 管理者後台，分為三個部份如下
├── ProductList : 管理商品詳細資訊，可進行增刪修改
├── Coupon : 管理優惠券，可進行增刪修改
├── Order : 管理訂單，查看每筆訂單詳細資訊

## 使用技術 Technologies

▪️ Vue CLI4 : SPA
▪️ Vue Router : Navigation Guards、Asynchronous Import Components
▪️ ESLint(Standard) : 統一撰寫程式碼的風格
▪️ Axios : 處理 AJAX 請求，串接 API 取得後台資料
▪️ VeeValidate : 驗證訂單內容
▪️ RWD : 根據桌電、平板、手機不同裝置來做內容響應變化
▪️ jQuery : 產品選單下拉動態
▪️ Bootstrap 4 + CSS 預處理器（SCSS）: 客製樣式（顏色、字體），製作個人風格網頁

## 套件

- vue
- bootstrap
- jquery
- popper.js
- vue-axios 、 axios 串接 API
- vue-router 管理由前端所模擬的路由器
- vue-loading-overlay 全畫面 Loading 小動畫
- vue-awesome-swiper 、swiper 輪播功能
- vee-validate 驗證表單
- fontawesome CDN icon 小圖示

## 特色功能介紹

> 回饋訊息與購車數量圖示更新 : 搭配 event bus 掛載到 Vue 原型下，讓不同的 Vue 實例可以共享

[![2.png](https://i.postimg.cc/X7rDzj9r/2.png)](https://postimg.cc/ZChc9h7m)

> 訂閱功能 : 信箱驗證格式是否正確與有無使用過、點擊優惠碼即複製

[![3.png](https://i.postimg.cc/TP671nFb/3.png)](https://postimg.cc/qN1XZ6kB)

> 產品列表分類 : 篩選後顯示想要的產品

[![4.png](https://i.postimg.cc/Z53sJw7Z/4.png)](https://postimg.cc/18mrHr1Y)

> 訂單流程 : 輸入優惠碼執行價錢打折、驗證客戶資料內容
> [![5.png](https://i.postimg.cc/yY2rqMTv/5.png)](https://postimg.cc/sv9J70qh)

## Vue.filter 過濾功能

- [千分號與金錢符號](https://github.com/Skyice-Chiang/blanco-coffee/blob/master/src/filters/currency.js)
- [Unix timestamp 轉換成日期](https://github.com/Skyice-Chiang/blanco-coffee/blob/master/src/filters/date.js)

## 聲明

- 此網站僅作為個人練習用，無商業用途
- 圖片來源: [unsplash](https://unsplash.com/)、Google 圖片、PCHome 圖片
