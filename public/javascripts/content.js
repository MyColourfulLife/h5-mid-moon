
// 参数配置
var images = [];
for (var i = 1; i <= 4; i++) {
  images.push(`./images/0${i}.png`);
}
// 获取 shareperson信息
var sharedPerson = {
  nickname: "沉香",
  avator: "images/sharedavator.jpg",
  words: `你站在桥上看风景, 
         看风景的人在楼上看你;
         明月装饰了你的窗子,
         你装饰了别人的梦.`
};
var timer2 = null;

// vue
var app = new Vue({
  el: "#app",
  data: {
    images: images,
    sharedPerson: sharedPerson,
    dmlists: [
      {
        nickname: "沉香",
        avator: "images/sharedavator.jpg",
        words: `你站在桥上看风景, 
             看风景的人在楼上看你;
             `
      },
      {
        nickname: "秋香",
        avator: "images/sharedavator.jpg",
        words: `唐伯虎点秋香`
      },
      {
        nickname: "siri",
        avator: "images/sharedavator.jpg",
        words: `你马上就要成功了`
      },
      {
        nickname: "siri",
        avator: "images/sharedavator.jpg",
        words: `
        明月装饰了你的窗子,
        你装饰了别人的梦.`
      },
      {
        nickname: "瘾君子",
        avator: "images/sharedavator.jpg",
        words: `
        无关人员,请速速撤离`
      }
    ]
  },
  methods: {
    click_moon: function(event) {
      // this 指当前 app实例 就是上面 var app = 。。。
      console.log("到下一页");
      $("#page2").attr("hidden", false);
      $("#page2").addClass("animated slideInUp");
    },
    click_crama: function(event) {
      console.log("wanna open carma");
      $("#page3").attr("hidden", false);

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

              var imgurl = `http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${wxglobleconfig.token}&media_id=${serverId}`
              // 3. 如果拿到了图片地址 请求服务器验证
              var encodeurl = encodeURIComponent(imgurl);

              var ismoonurl = `http://www.id-bear.com/node/moon/ismoon?imgurl=${imgurl}`;
              
              axios
              .get(ismoonurl)
              .then(
                // 如果成功，
                function(res) {
                  //  1. 显示下一页 需要获取的数据 包括 别人的话 弹幕 等 网页加载完就先请求，到时候只是显示数据
                  alert(res);
                  if (res.data.message) {
                    alert('亲，好像出问题，你可以换个试试');
                    return;
                  }
                  if (res.data.isMoon) {
                    $("#page3").addClass("animated slideInUp");
                  }else {
                    alert('亲，这不是月亮吧，再换个试试');
                  }

                }
              )
              .catch(function (err) {
                alert(err);
              });


              // var ismoonurl = "http://119.23.153.216:80/api/get_image_class_url";
              // axios({
              //   methods:'get',
              //   url:ismoonurl,
              //   params:{
              //     model_name:"moon_model",
              //     image_url:encodeurl
              //   }
              // }).then(function (res) {
              //   alert(res);
              // }).catch(function (err) {
              //   alert(err);
              // });

              
              // var ismoonurl = 'http://119.23.153.216:80/api/get_image_class_url?image_url=http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=ACTA4Kzej771dzDcgNwS7pOxsqspovdJ7FxA30bckrCKafIQcg-NXbxUE6MZGzbb_mupYE59pItBQyVySYZOsAVbyeXhFMATzEKMuWFoansOHwknSMNhFj7oDuNIX6JYWVUfAHAPON%26media_id=FOHp54Yw5nGAZpDwH_OJHnjfcNRXqp-FRlXqbqvFCsYpaxKhYLPp7nZOHo5GbFyB&model_name=moon_model';
             
            


            }
          });
        },
        fail: function(err) {
          console.log('拍照出错:',err);
        }
      });
    },
    click_send: function(event) {
      console.log("点我发送");
      $("#page4").attr("hidden", false);
      $("#page4").addClass("animated slideInUp");

      // donmutwo();
      // var timer = setInterval(donmutwo,1000);
    },
    get_allwords: function() {},
    startDm: function() {
      console.log($("#danmu"));
      // var danmu = document.getElementById(`danmu`);
      // var winH = danmu.clientHeight;

      var speak = this.dmlists;

      function insert() {
        var danmu = document.getElementById(`danmu`);
        var winH = danmu.clientHeight;
        var toplist = [0.1 * winH, 0.3 * winH, 0.5 * winH, 0.7 * winH];
        var newli = document.createElement(`div`);
        var randomS = Math.floor(Math.random() * speak.length);
        var pserson = speak[randomS];
        var content = `<span> <img src=${pserson.avator}> ${pserson.nickname}:${pserson.words} </span>`;
        newli.innerHTML = content;
        newli.className = `newli`;
        newli.style.color = "#000000";
        var t = winH - 30;
        var newliT = Math.floor(Math.random() * (t - 1));
        console.log(`高${winH},t:${t},top:${newliT}`);
        var newliL = danmu.clientWidth;
        newli.style.left = newliL + `px`;
        // newli.style.top = newliT + `px`;
        var topIndex = getRandomIntInclusive(0, toplist.length - 1);
        console.log(toplist);
        console.log(topIndex, toplist[topIndex]);
        newli.style.top = toplist[topIndex] + `px`;
        danmu.appendChild(newli);
        move(newli);
      }

      /**
 *生成随机数的函数 
 *获取 min max 之间 的随机整数
 */
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }

      function move(obj) {
        var timer1 = setInterval(function() {
          // var danmu=document.getElementById(`danmu`);
          var newliW = obj.clientWidth;
          var run = obj.offsetLeft;
          run--;
          if (run <= -newliW) {
            danmu.removeChild(obj);
            clearInterval(timer1);
          }
          obj.style.left = run + `px`;
        }, 10);
      }
      // insert();
      timer2 = setInterval(function() {
        insert();
      }, 8000);
      window.onfocus = function() {
        clearInterval(timer2);
        timer2 = null;
        timer2 = setInterval(function() {
          insert();
        }, 1000);
      };
      window.onblur = function() {
        clearInterval(timer2);
        timer2 = null;
      };
    }
  }
});

// app.startDm();

function donmutwo() {
  $("danmu").danmu({
    height: 200, //弹幕区高度
    width: 640, //弹幕区宽度
    zindex: 100, //弹幕区域z-index属性
    speed: 10000, //滚动弹幕的默认速度，这是数值值得是弹幕滚过每672像素所需要的时间（毫秒）
    sumTime: 65535, //弹幕流的总时间
    danmuLoop: true, //是否循环播放弹幕
    defaultFontColor: "#FFFFFF", //弹幕的默认颜色
    fontSizeSmall: 16, //小弹幕的字号大小
    FontSizeBig: 24, //大弹幕的字号大小
    opacity: "0.9", //默认弹幕透明度
    topBottonDanmuTime: 6000, // 顶部底部弹幕持续时间（毫秒）
    SubtitleProtection: false, //是否字幕保护
    positionOptimize: false, //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分

    maxCountInScreen: 6, //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
    maxCountPerSec: 10 //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
  });
  $("#danmu").danmu("addDanmu", [
    { text: "巴拉", color: "black", size: 1, position: 0, time: 1 },
    { text: "jerk", color: "black", size: 1, position: 0, time: 10 },
    { text: "yami", color: "black", size: 1, position: 0, time: 20 }
  ]);
  $("#danmu").danmu("danmuStart");
}

donmutwo();
