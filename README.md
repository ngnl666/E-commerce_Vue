# CoffeeBean

[![CoffeeBean](https://i.postimg.cc/XNtXVKCy/2021-06-27-4-12-05.png)](https://i.postimg.cc/XNtXVKCy/2021-06-27-4-12-05.png)

Demo: https://ngnl666.github.io/CoffeeBean/#/

## 簡介及專案架構 Introduction & Architecture

```
使用 Vue.js 開發的咖啡電商網站
```

### 📍 前台 :  
▪️ Home 首頁 : 網站介紹頁及咖啡特色介紹  
  
▪️ Shop 商品頁 : 各式各樣商品，可進行分類篩選、加入購物車、加入我的收藏、商品細節導覽  

▪️ DetailCard 商品詳細頁 : 單一商品細節，可選擇數量並加入購物車、顯示目前所在分類及下方商品推薦  

▪️ Favorite 我的收藏 : 放置我的收藏商品，以及我的優惠券  

▪️ Pick 抽卡系統 : 抽取優惠券並存放置我的收藏頁面  

▪️ Cart 購物車 : 購物車系統，分為三個部分如下  

- CustomerCart : 檢視購物車內的商品，可進行數量更改與刪除  
- CustomerImformation : 個人資料填寫以及訂單確認  
- CustomerOrder : 訂單成立，進行付款  

### 📍 後台 :  
▪️ Login 登入系統 : 管理者後台，分為三個部份如下  
- ProductList : 管理商品詳細資訊，可進行增刪修改  
- Coupon : 管理優惠券，可進行增刪修改  
- Order : 管理訂單，查看每筆訂單詳細資訊  

## 使用技術 Technologies

▪️ Vue3 : Use Options API 

▪️ Vue CLI4 : SPA  

▪️ Vuex4 : State Management Pattern、Using Modules

▪️ Vue Router4 : Navigation Guards、Async Components

▪️ VeeValidate4 : Form & Input Validation 

▪️ Axios : 串接 API  

▪️ Token : Verification with token

▪️ LocalStorage : Use on shopping cart & favorite product

▪️ Intersection Observer API : Replace scroll event, bring more efficiency   

▪️ Return Guard : Use in IF statement

▪️ RWD : Responsive Website For Pad & Smartphone 

▪️ SCSS + Customer BS5 : CSS preprocessor & Customized BS5 variables 


## 套件 Extensions

- vue-axios
- vue-loading-overlay
- ESLint + Prettier
- Bootstrap5
- fontawesome
- animate.css
- hover.css
- sweetalert

## Project Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 聲明 Statement

- 僅作為個人作品練習，所有資料皆來自網路，無商業用途
- 圖片來源: Unsplash、Google、Starbucks、PCHome
