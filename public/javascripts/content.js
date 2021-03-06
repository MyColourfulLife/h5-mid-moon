// 参数配置
var images = [];
for (var i = 1; i <= 4; i++) {
  images.push(`./images/0${i}.png`);
}

// vue
var app = new Vue({
  el: "#app",
  data: {
    inputMessage: null
  },
  methods: {
    click_moon: function(event) {
      // this 指当前 app实例 就是上面 var app = 。。。
      console.log("到下一页");
      $("#page2").attr("hidden", false);
      $("#page2").addClass("animated slideInUp");
    },
    shoot: function() {
      //发射弹幕
      if (!this.inputMessage || this.inputMessage.length === 0) {
        return;
      }
      $(".danmuArea").barrager(
        createDanmuItem(
          this.inputMessage,
          "avatorimgs/avator66.jpg",
          30,
          "red",
          0
        )
      );

      window.location.href = `http://www.id-bear.com/node/moon/share?saytomoon=${this
        .inputMessage}`;
    },
    playstop: function(event) {
      // 音乐
      var audio = document.getElementById("bgMusic");

      var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended 
      && audio.readyState > 2;
  
  if (!isPlaying) {
    audio.play();
    $('#playstop').removeClass("glyphicon glyphicon-volume-off");
    $('#playstop').addClass('glyphicon glyphicon-volume-up');
  } else {
    audio.pause();
    $('#playstop').removeClass("glyphicon glyphicon-volume-up");
    $('#playstop').addClass('glyphicon glyphicon-volume-off');
  }
        // if(audio.paused){ 
        //   audio.play();
        //   $('#playstop').removeClass("glyphicon glyphicon-volume-off");
        //   $('#playstop').addClass('glyphicon glyphicon-volume-up');
        // }else{
        //   audio.pause();
        //   $('#playstop').removeClass("glyphicon glyphicon-volume-up");
        //   $('#playstop').addClass('glyphicon glyphicon-volume-off');
        // }
    },
    click_crama: function(event) {
      // 1. 获取图像
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // 2. 拿到图片 将图片上传
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID

              var imgurl = `http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${wxglobleconfig.token}&media_id=${serverId}`;
              // 3. 如果拿到了图片地址 请求服务器验证
              var encodeurl = encodeURIComponent(imgurl);

              var ismoonurl = `http://www.id-bear.com/node/moon/moon/ismoon?imgurl=${encodeurl}`;

              axios
                .get(ismoonurl)
                .then(
                  // 如果成功，
                  function(res) {
                    if (res.data.message) {
                      alert("亲，好像出问题，你可以换个试试");
                      return;
                    }
                    if (res.data.isMoon) {
                      $("#page3").attr("hidden", false);
                      $("#page3").addClass("animated slideInUp");
                    } else {
                      alert("亲，这不是月亮吧，再换个试试");
                    }
                  }
                )
                .catch(function(err) {
                  alert(err);
                });
            }
          });
        },
        fail: function(err) {
          console.log("拍照出错:", err);
        }
      });
    },
    click_send: function(event) {
      console.log("点我发送");
      $("#page4").attr("hidden", false);
      $("#page4").addClass("animated slideInUp");
    }
  }
});

var saytomoon = "";
window.saytomoon = saytomoon;

function show() {

  window.saytomoon = app.inputMessage;
  var onMenuShareAppMessageObj = {
    title: "我有几句话藏在月亮里想对你说", // 分享标题
    desc: "明月寄相思 天涯共此时", // 分享描述
    link:  `http://www.id-bear.com/node/moon/moon?saytomoon=${app.inputMessage}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: "http://www.id-bear.com/node/moon/images/sharedimg.jpg", // 分享图标
    type: "link", // 分享类型,music、video或link，不填默认为link
    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    success: function() {
      // 用户确认分享后执行的回调函
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
      alert("您取消了分享");
    },
    trigger: function(res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
    }
  };

  var onMenuShareTimelineOjb = {
    title: "我有几句话藏在月亮里想对你说", // 分享标题
    link: `http://www.id-bear.com/node/moon/moon?saytomoon=${app.inputMessage}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: "http://www.id-bear.com/node/moon/images/sharedimg.jpg", // 分享图标
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
      alert("您取消了分享");
    }
  };


  setTimeout(function() {

    wx.onMenuShareAppMessage(onMenuShareAppMessageObj);
    wx.onMenuShareTimeline(onMenuShareTimelineOjb);
  }, 2000);

  
}
