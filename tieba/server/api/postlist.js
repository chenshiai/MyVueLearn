const Router = require('koa-router')
const postlist = new Router()
const db = require('../models') // 数据库
const isToken = require('../middle/isToken')
const Tool = require('../middle/tool')
const MarkDown = require('markdown-it')
const mdit = new MarkDown()
// 获取置顶帖
// /api/postlist/sticky
postlist.get('/sticky', async (ctx, next) => {
  // 查询所有置顶帖
  let sticky = await db.Postlist.findAll({
    where: {
      tags: {
        $like: '%1%'
      }
    }
  }).map(Tool.handleList)

  if (sticky != []) {
    ctx.body = {
      status: 1,
      data: sticky
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '帖子获取失败！'
    }
  }

})

// 分页获取已发布的帖子
// /api/postlist/page
postlist.post('/page', async (ctx, next) => {
  let { page } = ctx.request.body
  let list = await db.Postlist.findAll(
    {
      order: [['updated_at', 'DESC'], ['id']],
      where: {
        tags: {
          $notLike: '%1%'
        }
      },
      limit: 10, // 每页多少条
      offset: 10 * (page - 1) // 跳过多少条
    }
  ).map(Tool.handleList)

  if (list != []) {
    ctx.body = {
      status: 1,
      data: list
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '没有更多了！'
    }
  }
})

// 获取用户的所有草稿
// /api/postlist/mydrafts
postlist.post('/mydrafts', async (ctx, next) => {
  let { user_id } = ctx.userinfo
  let drafts = await db.Drafts.findAll({
    order: [['updated_at', 'DESC'], ['id']],
    where: {
      user_id
    }
  }).map(Tool.handleList)
  ctx.body = {
    status: 1,
    data: drafts
  }
})

// 删除草稿
// /api/postlist/mydrafts/delete
postlist.post('/mydrafts/delete', async (ctx, next) => {
  let { user_id } = ctx.userinfo
  let { id } = ctx.request.body
  let result = await db.Drafts.destroy(
    {
      where: {
        user_id,
        id
      }
    }
  )
  ctx.body = {
    status: result
  }
})

// 删除已发表的帖子
// /api/postlist/delete
postlist.post('/delete', async (ctx, next) => {
  // 解构文章的全部信息
  let { user_id } = ctx.userinfo
  let { id, title, content, tags } = ctx.request.body
  // 根据user_id,id来从postlist中删除文章
  let result = await db.Postlist.destroy(
    {
      where: {
        user_id,
        id
      }
    }
  )
  // 标签数组转字符串
  if (tags != []) {
    tags = tags.join(',')
  } else {
    tags = 0
  }
  let timestamp = Tool.getTimestamp()
  // 将被删除的文章插入到recycle表中
  let rec = await db.Recycle.create({
    topic_id: id, title, content, user_id, tags, created_at:timestamp,updated_at: timestamp
  })
  ctx.body = {
    status: result,
    data: rec
  }
})

// 获取指定帖子
// api/postlist/topic
postlist.post('/topic', async (ctx, next) => {
  let { id } = ctx.request.body
  let topic = await db.Postlist.findOne({
    where:{
      id,
    }
  })
  topic = Tool.handleList(topic.dataValues)
  topic.content = mdit.render(topic.content)
  // 浏览量+1
  let lookup = await db.Postlist.update({
    looknumber: ++topic.looknumber
  }, {
    where:{
      id
    },
    silent: true
  })
  if(topic){
    ctx.body = {
      status:1,
      data:topic
    }
  } else{
    ctx.body = {
      status:-1,
      msg:'未找到这篇帖子！'
    }
  }
})
module.exports = postlist
/**
 * 1：
 * sequelize自动添加createdAt字段
 * 
 * 但是为UTC时间
 * 
 * 2：
 * 前台获取客户机时间，发送给后端接收
 * 
 * 前后端分离，无法统一
 * 
 * 3：
 * 后端添加时间戳函数
 * 在更新和插入数据的时候调用
 * 生成服务机的时间插入
 * 数据格式为字符串
 * 
 */
// 数据创建更新时间规范方法
