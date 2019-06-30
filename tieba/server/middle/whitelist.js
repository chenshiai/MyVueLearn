module.exports = {
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    /^\/api\/postlist\/page/,
    /^\/api\/postlist\/sticky/,
    /^\/api\/postlist\/topic/,
    /^\/api\/reply\/list/,
    /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}