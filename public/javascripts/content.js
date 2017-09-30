// 参数配置
var images = [];
for (var i = 1; i <= 4; i++) {
  images.push(`./images/0${i}.png`);
}

// vue
var app = new Vue({
  el: "#app",
  data: {
    inputMessage:null
  },
  methods: {
    click_moon: function(event) {
      // this 指当前 app实例 就是上面 var app = 。。。
      console.log("到下一页");
      $("#page2").attr("hidden", false);
      $("#page2").addClass("animated slideInUp");
    },
    shoot:function () {
      //发射弹幕
      if (!this.inputMessage || this.inputMessage.length === 0) {
        return;
      }
      $('.danmuArea').barrager(createDanmuItem(this.inputMessage,"avatorimgs/avator66.jpg",30,'red'));
    },
    click_crama: function(event) {
      console.log("wanna open carma");
      $("#page3").attr("hidden", false);

      $("#page3").addClass("animated slideInUp");

      // 1. 获取图像

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log("拍照结果:", res);

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
                    alert(res);
                    if (res.data.message) {
                      alert("亲，好像出问题，你可以换个试试");
                      return;
                    }
                    if (res.data.isMoon) {
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

      // donmutwo();
      // var timer = setInterval(donmutwo,1000);
    }
  }
});
