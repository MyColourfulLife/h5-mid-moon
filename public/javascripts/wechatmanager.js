
// var wxglobleconfig = {};
// wxglobleconfig.jsapi_ticket = "<%= wxconfig.jsapi_ticket %>";
// wxglobleconfig.nonceStr = "<%= wxconfig.nonceStr %>";
// wxglobleconfig.timestamp = "<%= wxconfig.timestamp %>";
// wxglobleconfig.url = "<%- wxconfig.url %>";
// wxglobleconfig.signature = "<%= wxconfig.signature %>";
// wxglobleconfig.appId = "<%= wxconfig.appId %>";
// wxglobleconfig.token = "<%= wxconfig.token %>";
// wxglobleconfig.jsapi_ticket = [ 'chooseImage',
//    'uploadImage',
//    'menuItem:share:appMessage',
//    'menuItem:share:timeline',
//    'getNetworkType' ];

// window.wxglobleconfig = wxglobleconfig;

// console.log('绑定的微信配置',wxglobleconfig);

//    // 微信配置
//    wx.config(wxglobleconfig);

//     wx.ready(function() {

//       // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//     });

//     wx.error(function(res) {
//       console.log("错误",res);
//     });
var configurl = window.location.href;

var wechatconfig = `http://www.id-bear.com/node/moon/moon/wechatconfig?xxconfigurl=${configurl}`;
var wxglobleconfig = null;
axios
  .get(wechatconfig)
  .then(function(response) {
    wxglobleconfig = response.data;
    //获取微信配置
    console.log('微信配置',wxglobleconfig);

    // 微信配置
    wx.config(wxglobleconfig);

    wx.ready(function() {

      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });

    wx.error(function(res) {
      console.log("错误",res);
    });
  })
  .catch(function(error) {
    console.log("获取配置出错");
  });



  
  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
  wx.onMenuShareAppMessage({
    title: "", // 分享标题
    desc: "", // 分享描述
    link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: "", // 分享图标
    type: "", // 分享类型,music、video或link，不填默认为link
    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    }
  });
  
  
  // 上传图片接口
  // 上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
  wx.uploadImage({
    localId: "", // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function(res) {
      var serverId = res.serverId; // 返回图片的服务器端ID
    }
  });
  
  // 获取网络状态接口
  wx.getNetworkType({
    success: function(res) {
      var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    }
  });
  


