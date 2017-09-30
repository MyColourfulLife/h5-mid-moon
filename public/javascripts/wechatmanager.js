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

    var initWxShareTimeObj = {
      title: "我把话都放月亮里，进来看看吧", // 分享标题
      link: sharedurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "images/sharedimg.jpg", // 分享图标
      success: function () {
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
          alert('您取消了分享');
      }
  };

  var initWxShareAppMessage = {
      title: "我偷偷的告诉你", // 分享标题
      desc: "月亮里有我说的话", // 分享描述
      link: sharedurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "./sharedimg.jpg", // 分享图标
      type: "link", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
          // 用户确认分享后执行的回调函
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
          alert('您取消了分享' + url);
      }

  };

  setTimeout(function () {
      // 分享到朋友圈
      wx.onMenuShareTimeline(initWxShareTimeObj);
      // 分享给朋友
      wx.onMenuShareAppMessage(initWxShareAppMessage);

  }, 2000);



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
  


