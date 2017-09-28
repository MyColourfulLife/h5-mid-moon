var images = [];
for (var i = 1; i <= 4; i++) {
  images.push(`./images/0${i}.png`);
}

var sharedPerson = {
  nickname: "沉香",
  avator: "images/sharedavator.jpg",
  words: `你站在桥上看风景, 
         看风景的人在楼上看你;
         明月装饰了你的窗子,
         你装饰了别人的梦.`
};

var timer2 = null;


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
      },{
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
      console.log('到下一页');
      $('#page2').attr('hidden',false);
      $('#page2').addClass('animated bounceInUp');
    },
    click_crama: function(event) {
      console.log("wanna open carma");
      $('#page3').attr('hidden',false);
      $('#page3').addClass('animated bounceInUp');
    },
    click_send: function(event) {
      console.log("点我发送");
      $('#page4').attr('hidden',false);
      $('#page4').addClass('animated bounceInUp');
      donmutwo();
    },
    get_allwords: function() {},
    startDm: function() {
      console.log($('#danmu'));
      // var danmu = document.getElementById(`danmu`);
      // var winH = danmu.clientHeight;

      var speak = this.dmlists;
     
      function insert() {
       var danmu = document.getElementById(`danmu`);
      var winH = danmu.clientHeight;
      var toplist = [0.1 * winH,0.3 * winH,0.5 * winH,0.7 * winH];
        var newli = document.createElement(`div`);
        var randomS = Math.floor(Math.random() * speak.length);
        var pserson = speak[randomS];
        var content = `<span> <img src=${pserson.avator}> ${pserson.nickname}:${pserson.words} </span>`;
        newli.innerHTML = content;
        newli.className = `newli`;
        newli.style.color = '#000000'
        var t = winH - 30;
        var newliT = Math.floor(Math.random() * (t - 1));
        console.log(`高${winH},t:${t},top:${newliT}`);
        var newliL = danmu.clientWidth;
        newli.style.left = newliL + `px`;
        // newli.style.top = newliT + `px`;
        var topIndex = getRandomIntInclusive(0,toplist.length - 1);
        console.log(toplist);
        console.log(topIndex,toplist[topIndex]);
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
    height: 200,  //弹幕区高度
    width: 640,   //弹幕区宽度
    zindex :100,   //弹幕区域z-index属性
    speed:7000,      //滚动弹幕的默认速度，这是数值值得是弹幕滚过每672像素所需要的时间（毫秒）
    sumTime:655350,   //弹幕流的总时间
    danmuLoop:false,   //是否循环播放弹幕
    defaultFontColor:"#FFFFFF",   //弹幕的默认颜色
    fontSizeSmall:16,     //小弹幕的字号大小
    FontSizeBig:24,       //大弹幕的字号大小
    opacity:"0.9",			//默认弹幕透明度
    topBottonDanmuTime:6000,   // 顶部底部弹幕持续时间（毫秒）
    SubtitleProtection:false,     //是否字幕保护
    positionOptimize:false,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
    
    maxCountInScreen: 6,   //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
    maxCountPerSec: 5      //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
    });
  
    $("#danmu").danmu("addDanmu",[
      { text:"巴拉" ,color:"black",size:1,position:0,time:5}
     ,{ text:"巴拉巴拉" ,color:"black" ,size:1,position:0,time:5}
     ,{ text:"巴拉巴拉芭芭拉" , color:"black" ,size:1,position:0,time:5},
     { text:"巴拉" ,color:"black",size:1,position:0,time:5}
     ,{ text:"巴拉巴拉" ,color:"black" ,size:1,position:0,time:5}
     ,{ text:"巴拉巴拉芭芭拉" , color:"black" ,size:1,position:0,time:5},
     { text:"巴拉" ,color:"black",size:1,position:0,time:5}
     ,{ text:"巴拉巴拉" ,color:"black" ,size:1,position:0,time:5}
     ,{ text:"巴拉巴拉芭芭拉" , color:"black" ,size:1,position:0,time:5},
     { text:"巴拉" ,color:"black",size:1,position:0,time:5}
     ,{ text:"巴拉巴拉" ,color:"black" ,size:1,position:0,time:5}
     ,{ text:"巴拉巴拉芭芭拉" , color:"black" ,size:1,position:0,time:5}
   ])
  
   $('#danmu').danmu('danmuStart');
}

