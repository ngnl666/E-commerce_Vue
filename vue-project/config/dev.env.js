'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 環境變數(開發)
module.exports = merge(prodEnv, { // 新增後重新 run cli
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"',
  CUSTOMERPATH: '"ngnl"',
})
