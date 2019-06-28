const Sequelize = require('sequelize')
const config = require('../config/default')

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

module.exports = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host, // 数据库地址
  dialect: 'mysql', // 指定连接的数据库类型
  pool: {
    max: 50, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  },
  operatorsAliases
})

/*
// new Sequelize(database, [username=null], [password=null], [options={}])
// class Sequelize 接收4个参数，后三个参数是可选的

// 没有密码和options
var sequelize = new Sequelize('database', 'username')

// 没有options
var sequelize = new Sequelize('database', 'username', 'password')

// 没有密码有options
var sequelize = new Sequelize('database', 'username', null, {})

// 都有
var sequelize = new Sequelize('my_database', 'john', 'doe', {})

// new Sequelize(uri, [options={}])
// 通过uri连接数据库
var sequelize = new Sequelize('mysql://localhost:3306/database', {})
*/