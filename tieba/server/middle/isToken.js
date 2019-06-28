const config = require('../config/default')
const jwt = require('jsonwebtoken')
const whitelist = require('./whitelist')
module.exports = {
  encrypt: (data, time) => {
    return jwt.sign(data, config.jwtSecret, {expiresIn:time})
  },
  // 如果需要判断权限，先使用这个中间件
  decrypt: async (ctx, next) => {
    let url = ctx.request.url
    // 判断url是否在白名单内
    if(whitelist.path.filter(path => path.exec(url)).length > 0){
      await next()
      return
    }
    let token = ctx.cookies.get('token')
    if (token) {
      try {
        // 将名为token的cookie反解析并与服务器配置的jwtSecret比对。防止伪造‘token’
        // 获取到里面的用户信息，挂在ctx上，给下一个中间件使用
        let data = jwt.verify(token, config.jwtSecret)
        ctx.userinfo = data
      } catch (e) {
        ctx.body = {
          status: -1,
          msg: '身份校验出错，请在首页进行反馈，谢谢。'
        }
        return
      }
      await next()
    } else {
      // 没有token授权
      ctx.body = {
        status: -1,
        msg: '没有权限！'
      }
      return;
    }
  }
}
