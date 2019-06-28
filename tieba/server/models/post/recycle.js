'use strict';
// 这里是已经删除的帖子表
const Sequelize = require('sequelize')
const sequelize = require('../db')
const { STRING, INTEGER, DATE, NOW } = Sequelize;

const Recycle = sequelize.define('recycle', {
  id: {
    type: INTEGER(255),
    primaryKey: true,
    autoIncrement: true
  },
  topic_id:{
    type: INTEGER,
    allowNull: false
  },
  title: {
    type: STRING(255),
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
Recycle.sync();

module.exports = Recycle
