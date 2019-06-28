'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../db')
const { STRING, INTEGER, DATE, NOW } = Sequelize;

const Userlist = sequelize.define('userlist', {
  user_id: { type: STRING(255),primaryKey: true },
  username: { type: STRING(50) },
  password: { type: STRING(255) },
  nickname:{ type: STRING(255) },
  power: { type: INTEGER(10) },
  followpost: { type: STRING(1000) },
  avatar_url: { type: STRING(255) },
  created_at: { type: STRING, allowNull:true},
  updated_at: { type: STRING, allowNull: true }
}, {
    freezeTableName: true ,// 不自动将表名添加复数
    createdAt: false,
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: false,
    //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false, //'deleted_at',
    //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: false
  });
// 创建表
Userlist.sync();

module.exports = Userlist