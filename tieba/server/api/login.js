const Router = require('koa-router')
const login = new Router()
const db = require('../models') // 数据库
const Tool = require('../middle/tool')
const Token = require('../middle/isToken')
// 用户登录
// /api/login/
login.post('/', async (ctx, next) => {
  let { username, password } = ctx.request.body // 获取表单
  // 查看是否存在相同用户名
  let user = await db.Userlist.findOne({
    where: {
      username
    }
  })

  if (user) {
    password = Tool.crypto(password)
    if (user.password === password) {
      const token = Token.encrypt({
          user_id: user.user_id,
          power: user.power
        }, 60 * 60 * 24)
      
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      };
      // 向客户端发送一个表示'已经授权'的cookie设置
      // 该授权的cookie使用服务器配置的统一命名，内容为jwt模块生成的一段密文，opts表示cookie在浏览器上的配置
      ctx.cookies.set('token', token, opts)
      ctx.cookies.set('userinfo', escape(user.nickname) + '_' + user.user_id + '_' + user.power, {
        httpOnly: false
      })
      ctx.body = {
        status: 1,
        data: user
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '密码错了呢~'
      }
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '账号未注册哦~~！'
    }
  }
})

module.exports = login