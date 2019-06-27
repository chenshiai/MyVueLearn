const API = {
  // 抛出异常
  error: function (msg) {
    throw new Error(msg);
  },
  // 防抖对象
  debounce: function (
    abort = error.error('使用debounce，至少传入一个方法'),
    time = 100,
    options = { leading: true, trailing: true, context: null }) {
    var timer = null;
    var process = function (...args) {
      if (timer) { clearTimeout(timer) }
      if (options.leading && !timer) {
        timer = setTimeout(null, time);
        abort.apply(options.context, args)
      } else if (options.trailing) {
        timer = setTimeout(function () {
          abort.apply(options.context, args);
          timer = null;
        }, time)
      }
    }
    process.cancel = function () {
      clearTimeout(timer);
      timer = null;
    }
    return process;
  },
  // 获取cookies
  getCookie: function (cname) {
    var name = cname + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  },
  // 返回顶部
  goToTop: function () {
    var currentScroll = API.getScrollTop();
    if (currentScroll > 0) {
      window.requestAnimationFrame(API.goToTop);
      window.scrollTo(0, currentScroll - currentScroll / 5);
    }
  },
  // 获取滚动条高度
  getScrollTop: function () {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  },
  // utc时间转北京时间
  utc2beijing: function (utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;
    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
  },
  // 序列化反序列化法
  // 对象深拷贝
  deepClone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
export default API;