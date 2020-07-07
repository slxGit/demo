
Page({
  data: {
    orderId: ''
  },
  onLoad(query) { 
    this.setData({ order: query.order,uid:query.uid,money:query.money,content:query.content });
  },
  onShow() {
    var that = this;

    my.showLoading({
      text: '正在跳转支付...',
    });
     my.request({
            url: 'https://tlp.aguoda.com/home/program/aliPay', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
            method: 'GET',
            data: {
              out_trade_no: that.data.order, 
              total_amount: that.data.money, 
              uid:that.data.uid, 
            },
            dataType: 'json',
            success: (res) => {   
              if (res.data.code == 0) {
                my.tradePay({
                  tradeNO: res.data.msg.trade_no,
                  success: (res) => {  
                    if (res.resultCode == 9000) {
                      my.httpRequest({
                        url: 'https://tlp.aguoda.com/home/program/alipay_notify',
                        method: 'POST',
                        data: {
                          orderId: that.data.order,
                          ac: res.result,
                          content:that.data.content, 
                        },
                        dataType: 'json',
                        success: (data) => { 
                          if(data.data.code == 0){
                               my.reLaunch({
                                url: '../index/index' 
                              }); 
                          }else{
                          my.alert({
                            content: '支付出错了！请返回重试',
                            buttonText: '马上重试',
                            success: () => {
                              my.navigateBack();
                            },
                          });
                          }
                        }
                      });

                    } else {
                      my.alert({
                        content: '支付出错了！请返回重试',
                        buttonText: '马上重试',
                        success: () => {
                          my.navigateBack();
                        },
                      });
                    }

                  },
                  fail: (res) => {
                    my.alert({
                      content: '支付出错了！请返回重试',
                      buttonText: '马上重试',
                      success: () => {
                        my.navigateBack();
                      },
                    });
                  }
                }); 
              } 
               my.hideLoading();
            },
            fail: (res) => {
              console.log('fail:');
              my.hideLoading();
            } 
             
          });
  }
});
