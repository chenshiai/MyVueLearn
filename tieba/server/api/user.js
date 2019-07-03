const Router = require('koa-router')
const user = new Router()
const fs = require('fs')
const path = require('path')
const upload = require('../middle/upload')

user.post('/img/upload',upload.single('image'), async (ctx, next)=>{
  console.log(ctx.req.file);
  let url = ctx.req.file.destination.replace(/public/,'') +'/'+ ctx.req.file.filename 
  ctx.body = {
    status:1,
    data:url
  };
})

module.exports = user