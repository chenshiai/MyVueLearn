const Router = require('koa-router')
const register = new Router()
const db = require('../models') // 数据库
const uuid = require('uuid') // 生成u_id
const Tool = require('../middle/tool') // 工具仓库
const Token = require('../middle/isToken')
// 用户注册
// /api/register/
register.post('/', async (ctx, next) => {
  let { username, password, nickname } = ctx.request.body // 获取表单
  // 查看是否存在相同用户名
  let usernameOnly = await db.Userlist.findOne({
    where: {
      username
    }
  })

  // 返回结果
  if (usernameOnly) {
    ctx.body = {
      status: -1,
      msg: '用户名已被使用！'
    }
  } else {
    // uuid生成唯一id
    let user_id = uuid.v4().replace(/-/g, '')
    // password加密
    password = Tool.crypto(password)

    let timestamp = Tool.getTimestamp()
    let user = await db.Userlist.create({
      username,
      password,
      nickname,
      user_id,
      power: 0,
      avatar_url: '',
      created_at: timestamp,
      updated_at: timestamp
    })
    // 返回新添加的用户信息
    if (user) {
      const token = Token.encrypt(
        {
          nickname: user.nickname,
          user_id: user.user_id,
          power: user.power
        })

      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
      };
      // 向客户端发送一个表示'已经授权'的cookie设置
      // 该授权的cookie使用服务器配置的统一命名，内容为jwt模块生成的一段密文，opts表示cookie在浏览器上的配置
      ctx.cookies.set('token', token, opts)
      ctx.body = {
        status: 1,
        data: user,
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '注册失败！T_T'
      }
    }

  }
})


module.exports = register