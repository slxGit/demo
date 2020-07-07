Page({
  onLoad(e) {
    this.webViewContext = my.createWebViewContext('web-view');   
  },
  // 接收来自H5的消息
  onMessage(e) {
    var that = this;
    
    if(typeof e.detail.login != undefined && e.detail.login == 1) { //开始登录
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => { 
          my.request({
            url: 'https://tlp.aguoda.com/home/program/userId', // 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
            data: {
              authCode: res.authCode,
            },
            success: (result) => {
              if(result.data.code == 1) {
                that.webViewContext.postMessage({'u': result.data.data});
              } else {
                my.showToast({
                  type: 'none',
                  content: '登录失败!请重试',
                  duration: 1500,
                });
              }
            },
            fail: () => {
              // 根据自己的业务场景来进行错误处理
               my.showToast({
                type: 'none',
                content: '登录失败!请重试',
                duration: 1500,
              });
            }
          });
        },
      });
    } 


    // 向H5发送消息
    this.webViewContext.postMessage({'sendToWebView': '1'});
  
  
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
