'use strict';
// 这里是已经发布的帖子表
const Sequelize = require('sequelize')
const sequelize = require('../db')
const { STRING, INTEGER, DATE, NOW } = Sequelize;

const Postlist = sequelize.define('postlist', {
  id: {
    type: INTEGER(255),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: STRING(255),
    allowNull: false
  },
  nickname:{
    type: STRING(50),
    allowNull: false
  },
  content: {
    type: STRING(2000),
    allowNull: false
  },
  user_id: {
    type: STRING(255),
    allowNull: false
  },
  tags: {
    type: STRING(255),
    allowNull: true,
    defaultValue: 0
  },
  fileurl: {
    type: STRING(255),
    allowNull: true
  },
  imgurl: {
    type: STRING(255),
    allowNull: true
  },
  looknumber:{
    type:INTEGER,
    allowNull:true,
    defaultValue:0
  },
  replynumber:{
    type:INTEGER,
    allowNull:true,
    defaultValue:0
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
Postlist.sync();

module.exports = Postlist
