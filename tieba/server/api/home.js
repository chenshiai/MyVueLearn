const Router = require('koa-router')
const home = new Router()
const db = require('../models')
// /home
home.get('/', async (ctx, next) => {
  
  await next()
  ctx.body = {
    "code": 1,
    "data": "这里是next",
    "mesg": 'ok'
  }
})

// home/list
home.get('/', async (ctx, next) => {
  console.log('根路由')
  
  await next()
})

home.get('/post', async (ctx, next)=>{
  ctx.body = await db.Postlist.findAll()
})

module.exports = home