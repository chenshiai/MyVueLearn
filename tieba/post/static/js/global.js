const API = {
  // 抛出异常
  error: function (msg) {
    throw new Error(msg);
  },
  // 防抖对象
  debounce: function (
    abort = error.error('使用debounce，至少传入一个方法'),
    time = 100,
    options = { leading: false, trailing: true, context: null }) {
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
  // 序列化反序列化法
  // 对象深拷贝
  deepClone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  // 判断当前滚动条是否在底部
  isbuttom: function () {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    return scrollTop + windowHeight == scrollHeight;
  },
  /**
   * 标签懒加载,将需要添加入html的标签分批加载。
   * @param {array} data json对象数组。
   * @param {function} every 数据处理方法
   * @param {function} complete 所有数据处理完后执行的方法（可选）
   */
  Taglazyload: function (data, every, complete) {
    var _data = [...data],
      _callback = every,
      _complete = complete || function () { };

    /**
     * Taglazyload对象上的方法。
     * @param {number} num 设置每批多少数据。
     */
    this.lazyload = function (num) {
      if (_data.length < num && _data.length > 0) {
        num = _data.length;
      }
      for (let i = num; i-- && _data.length > 0;) {
        _callback(_data.shift());
      }
      if (_data.length === 0) {
        _complete();
      }
    }
    /**
     * 查看当前-标签懒加载-对象的data。
     */
    this.getData = function () {
      return data;
    }
    /**
     * 直接调用一次回调函数。
     */
    this.callback = function () {
      _callback();
    }
  }
}
export default API;