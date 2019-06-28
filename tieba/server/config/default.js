// 这里是server用的配置
require('env2')('./.env')
const { env } = process

const config = {
  // 启动端口
  port: env.PORT,

  // 数据库配置
  database: {
    host: env.DB_HOST,           //这是数据库的地址
    user: env.DB_USER,                  //需要用户的名字
    password: env.DB_PASSWORD,            //用户密码 ，如果你没有密码，直接双引号就是生成环境密码：123456
    database: env.DB_DATABASE,           //数据库名字 生成环境数据库名 pictre
    multipleStatements: true
  },

  // 加密配置
  crypto:{
    password_secret:env.CRYPTO_PASSWORD // 给密码加密
  },
  // token加密
  jwtSecret:env.JWTSECRET
}

module.exports = config