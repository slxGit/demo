export const request = (params) => {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  return new Promise((resolve, reject) => {
    my.request({
      ...params,
      url: params.url,
      success: resolve,
      fail: reject,
    })
  })
}