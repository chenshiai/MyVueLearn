'use strict';
// 这里是草稿箱表
const Sequelize = require('sequelize')
const sequelize = require('../db')
const { STRING, INTEGER, DATE, NOW } = Sequelize

const Drafts = sequelize.define('drafts', {
  id:{
    type: INTEGER(255),
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: STRING(255),
    allowNull: true
  },
  content: {
    type: STRING(2000),
    allowNull: true
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
Drafts.sync()

module.exports = Drafts