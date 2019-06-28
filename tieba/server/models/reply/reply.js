'use strict';
// 这里是草稿箱表
const Sequelize = require('sequelize')
const sequelize = require('../db')
const { STRING, INTEGER, DATE, NOW } = Sequelize

const Reply = sequelize.define('reply', {
  // 回复id
  id:{
    type: INTEGER(255),
    primaryKey: true,
    autoIncrement: true
  },
  // 回复者user_id
  user_id: {
    type: STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  // 回复帖子id
  topic_id:{
    type: STRING(255),
    allowNull:false
  },
  // 回复对象user_id
  amis:{
    type: STRING(255),
    allowNull: false
  },
  // 回复内容
  content: {
    type: STRING(500),
    allowNull: true
  },
  // 回复楼层的id
  floor:{
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  created_at: { type: STRING, allowNull:true},
  updated_at: { type: STRING, allowNull: true }
}, {
  freezeTableName: true,// 不自动将表名添加复数
  createdAt: false,
  // 将updatedAt对应到数据库的updated_at字段
  updatedAt: false,
  //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
  deletedAt: false, //'deleted_at',
  //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
  paranoid: false
})

// 创建表
Reply.sync()

module.exports = Reply