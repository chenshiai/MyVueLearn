const koa = require('koa2')
const app = new koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const Token = require('./middle/isToken')
const static = require('koa-static')
const path = require('path')
app.use(bodyParser())
app.use(Token.decrypt)

// 配置静态资源加载中间件
app.use(static(path.join(__dirname,'./public')))


let api = fs.readdirSync(__dirname + '/api')
api.forEach((element) => {
    let module = require(__dirname + '/api/' + element)
    /*
      api 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 api 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/api/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})
app.use(router.routes())

app.listen(3000, ()=>{
  console.log("Koa server start port 3000!")
})