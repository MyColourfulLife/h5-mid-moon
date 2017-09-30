
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
      wx.hideMenuItems({
        menuList: [
          "menuItem:share:qq",
          "menuItem:share:weiboApp",
          "menuItem:favorite",
          "menuItem:share:facebook",
          "menuItem:share:QZone",
          "menuItem:openWithSafari",
          "menuItem:share:brand"
        ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        success: function(res) {
          //alert("隐藏");
        }
      });

      wx.showMenuItems({
        menuList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 要显示的菜单项，所有menu项见附录3
      });
    });

    wx.error(function(res) {
      console.log("错误",res);
    });
  })
  .catch(function(error) {
    console.log("获取配置出错");
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
  


