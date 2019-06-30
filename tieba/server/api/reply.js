const Router = require('koa-router')
const reply = new Router()
const db = require('../models') // 数据库
const sequelize = require('../models/db')
const Tool = require('../middle/tool')
// 根据id获取帖子的所有回复
// /api/reply/list
reply.post('/list', async (ctx, next) => {
  let { id } = ctx.request.body
  // 这里用不来sequelize的API，所以就直接写sql语句了
  let result = await sequelize.query(`SELECT
  reply.*,
  A.nickname,
  B.nickname AS amisname
  FROM
  reply ,
  userlist AS A ,
  userlist AS B
  WHERE
  reply.user_id = A.user_id AND
  reply.amis = B.user_id AND
  reply.topic_id = ${id}
  `)
  let data = result[0].map(Tool.handleList)
  
  // 获取所有上层回复
  let updata = data.filter(item => item.floor == 0)
  // 获取楼中楼回复
  let floordata = data.filter(item => item.floor != 0)
  let index = 2
  updata = await updata.map(item => {
    // 将楼中楼插入到上层中
    item.index = index++
    item.replyfloor = floordata.filter(floor => floor.floor == item.id)
    return item
  })
  if (result) {
    ctx.body = {
      status: 1,
      data: updata
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '回复获取失败！'
    }
  }
})


// 添加回复
// /api/reply/add
reply.post('/add', async (ctx, next) => {
  let { amis, content, topic_id, user_id, replynumber, floor } = ctx.request.body
  let timestamp = Tool.getTimestamp()
  let result = await db.Reply.create({
    amis,
    content,
    topic_id,
    user_id,
    floor,
    created_at: timestamp,
    updated_at: timestamp
  })
  let replyup = await db.Postlist.update({
    replynumber: ++replynumber,
    updated_at: timestamp
  }, {
      where: {
        id: topic_id
      }
    })
  if (result) {
    ctx.body = {
      status: 1,
      data: result
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '回复失败！'
    }
  }

})
module.exports = reply
/**
 * 关于楼中楼回复的实现方式
 * 数据结构：
 * 一条最上层回复对应0~n条楼中回复
 *
 * 方案一：
 * 数据库:上层回复-> reply表，楼中楼-> replyfloor表
 *
 * 根据前台传入floor判断是否为楼中楼回复
 * 0 表示上层回复，否则为上层回复的 id 并插入到replyfloor表
 *
 * 前台每条上层回复加载完毕后发送搜索楼中楼的请求
 * 再显示
 *
 * 方案二：
 * 数据库： 只有一个reply表
 *
 * 前台根据帖子id来获取所有上层回复和楼中楼回复
 *
 * 剩下的前台操作
 * 先显示floor为0的上层回复，再遍历 剩下的楼中楼回复
 * 将 id === floor 的回复显示在一起
 *
 * 方案三：
 * 数据库:上层回复-> reply表，楼中楼-> replyfloor表
 *
 * 存储方式同方案一
 *
 * 后端操作
 * 将所有的上层回复放在replylist中
 * 再搜索所有的楼中楼回复放在replyfloor中
 * 再根据上层回复的id从楼中楼回复中遍历
 * 再显示
 *
 *
 */