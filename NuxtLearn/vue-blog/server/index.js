const {
  Nuxt,
  Builder // mvc req res pages/index.vue
} = require('nuxt')
const config = require('../nuxt.config.js')
const express = require('express')

const app = express()
const path = require('path')
async function start() {
  const nuxt = new Nuxt(config)
  if(true) {
    // 开发阶段实时编译
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(nuxt.render) //使用此中间件 路由前端管
  app.listen(3025, ()=>{console.log('server started at part 3025')})
}
start()