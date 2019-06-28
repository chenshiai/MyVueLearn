const config = require('../config/default')
const Crypto = require('crypto')
const Tool = {
  /**
   * 对帖子中的tags字符串转为数组
   */
  handleList: item => {
    item.tags = item.tags && item.tags.split(",").filter(tag => tag != 0)
    item.created_at = item.created_at && Tool.timetrans(item.created_at)
    item.updated_at = item.updated_at && Tool.timetrans(item.updated_at)
    return item
  },
  /**
   * 获取时间戳
   */
  getTimestamp: () => {
    return Date.parse(new Date()) / 1000
  },
  /**
   * 时间戳 转时间
   */
  timetrans: timestamp => {
    let date = new Date(timestamp * 1000)//如果date为13位不需要乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
  },
  /**
   * 加密密码
   */
  crypto: password => {
    return Crypto.createHmac('sha256', config.crypto.password_secret).update(password).digest('hex');
  }
}
module.exports = Tool