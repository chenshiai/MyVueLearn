const Router = require('koa-router')
const autologin = new Router()
// 用户自动登录获取权限
// /api/autologin/check
autologin.post('/check', async (ctx, next)=>{
  let userinfo = ctx.userinfo
  ctx.body = {
    status: 1,
    data: userinfo
  }
})
module.exports = autologin