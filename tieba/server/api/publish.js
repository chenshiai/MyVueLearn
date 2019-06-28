const Router = require('koa-router')
const publish = new Router()
const db = require('../models') // 数据库
const Tool = require('../middle/tool')
// /api/publish
publish.post('/', async (ctx, next) => {
  let { postId, draftsId, title, content, nickname, user_id, tags } = ctx.request.body
  let timestamp = Tool.getTimestamp()
  if (postId) {
    // 如果是更新帖子
    // 标签数组转字符串再存入数据库
    if (tags != []) {
      tags = tags.join(',')
    } else {
      tags = 0
    }

    let result = await db.Postlist.update({
      title, content, tags, updated_at: timestamp
    }, {
        where: {
          id: postId
        }
      })
    ctx.body = {
      status: 1,
      data: result
    }
  } else if (draftsId) {
    // 如果是发表草稿
    let result = await db.Postlist.create({
      title, content, nickname, user_id, created_at: timestamp,
      updated_at: timestamp
    })
    if (result) {
      // 如果新加成功则从草稿箱删除
      let del = await db.Drafts.destroy({
        where: {
          id: draftsId
        }
      })
      ctx.body = {
        status: del
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '发表失败！'
      }
    }
  }
})

// /api/publish/drafts
publish.post('/drafts', async (ctx, next) => {
  let { user_id } = ctx.userinfo
  let { id, title, content } = ctx.request.body
  let timestamp = Tool.getTimestamp()
  let result = await db.Drafts.update({
    title,
    content,
    updated_at: timestamp
  }, {
      where: {
        id,
        user_id
      }
    })
  ctx.body = {
    status: 1,
    data: result.dataValues
  }
})

// /api/publish/init
publish.post('/init', async (ctx, next) => {
  let { user_id } = ctx.userinfo
  let timestamp = Tool.getTimestamp()
  let result = await db.Drafts.create({
    user_id,
    created_at: timestamp,
    updated_at: timestamp
  })
  ctx.body = {
    status: 1,
    data: result.dataValues
  }
})
module.exports = publish