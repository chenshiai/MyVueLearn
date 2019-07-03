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
  timetrans1: timestamp => {
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
   * 时间戳 转多久前
   */
  timetrans: dateTimeStamp => {
    dateTimeStamp = dateTimeStamp * 1000
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) { return }
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前"
    }
    else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前"
    }
    else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前"
    }
    else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前"
    }
    else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前"
    } else
      result = "刚刚"
    return result
  },
  /**
   * 加密密码
   */
  crypto: password => {
    return Crypto.createHmac('sha256', config.crypto.password_secret).update(password).digest('hex')
  }
}
module.exports = Tool