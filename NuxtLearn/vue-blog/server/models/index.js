const mongoose = require('mongoose')
const mongoUrl = `mongodb://127.0.0.1:27017/blog`
const requireAll = require('require-all')
requireAll({
  dirname: path.join(__dirname, './'),
  filter: /(.+)\.model\.js$/,
  recursive: true
})

const User = mongoose.model('User')

mongoose.connection.openUri(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  user: '',
  pass: ''
}).once('open', async ()=>{
  console.log('数据库连接成功')
  let users = new User({
    role: 'superAdmin',
    username: 'root',
    password: '123456',
    email: '123123',
  })
  users.save()
})

