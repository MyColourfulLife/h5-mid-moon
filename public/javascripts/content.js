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
             明月装饰了你的窗子,
             你装饰了别人的梦.`
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
      }
    ]
  },
  methods: {
    click_moon: function(event) {
      // this 指当前 app实例 就是上面 var app = 。。。
      alert("you click me!!!");
    },
    click_crama: function(event) {
      alert("wanna open carma");
    },
    click_send: function(event) {
      alert("点我发送");
    },
    get_allwords: function() {},
    startDm: function() {
      // 清空计时器
      var timer = null;
      //   颜色
      var colors = [
        "#2C3E50",
        "#FF0000",
        "#1E87F0",
        "#7AC84B",
        "#FF7F00",
        "#9B39F4",
        "#FF69B4"
      ];
      console.log('添加弹幕');
      for (var i = 0; i < app.dmlists.length; i++) {
        addBarrage(app.dmlists[i],i);
      }
      //   添加弹幕
      function addBarrage(person,i) {
        //   清除计时器
        clearInterval(timer);
        //在 box 中插入弹幕
        // 获取弹幕容器宽高
        var screenW = document.getElementById('danmuArea').clientWidth;
        var screenH = document.getElementById('danmuArea').clientHeight; //获取当前屏幕高度
          // 生成随机数
          var index = parseInt(Math.random() * 7); //生成一个0~6的随机数
          var max = Math.floor(screenH / 10);
          // 创建span标签
          var span = document.createElement("span");
          // 设置起始位置 颜色 文本
          span.style.marginLeft = screenW + "px";
        
          span.style.color = colors[index];
          span.innerHTML = person.words;
          var id = "item1";
          if (i%3 === 0) {
            id = "item1"
          } else if (i%3 === 1) {
            id = "item2"
          } else {
            id = "item3"
          }
          // 将弹幕加入到弹幕框
          var dmDom = document.getElementById(id);
          dmDom.appendChild(span);
          // 启动计时器
          timer = setInterval(move, 10);
      }

      function move() {
        var arr = [];
        // 获取所有的弹幕span
        var dmNode = document.getElementById('danmuArea');
        var oSpan = [];
        if (dmNode) {
          oSpan = dmNode.getElementsByTagName("span");
        }
        for (var i = 0; i < oSpan.length; i++) {
          // 保存所有的左偏移
          arr.push(oSpan[i].marginLeft);
          //   让每个位移 减少2
          arr[i] -= 2;
          //   更新标签的left值
          oSpan[i].style.marginLeft = arr[i] + "px";
          //   如果到头了 就移除这个span
          if (arr[i] < -oSpan[i].marginLeft) {
            var dmDom = document.getElementById("danmuArea");
           console.log('come in');
            var _parentElement = oSpan[i].parentNode;
            if(_parentElement){
                   _parentElement.removeChild(_element);  
            }
           
          }
        }
      }
    }
  }
});

// app.startDm();

var danmu=document.getElementById(`danmu`);
var winH=danmu.clientHeight;
var speak=[`哇塞好牛逼啊`,`好帅啊`,`前方高能`,`hahahahaha`,`哈哈哈哈`,`风流倜傥`,`我爱你阿啊啊啊`,`哈哈哈`];
function insert(){
    var newli=document.createElement(`div`);
    var randomS=Math.floor(Math.random()*8);
    var r=Math.floor(Math.random()*266);
    var g=Math.floor(Math.random()*266);
    var b=Math.floor(Math.random()*266);
    newli.innerHTML=speak[randomS];
    newli.className=`newli`;
    newli.style.color=`rgb(${r}, ${g} ,${b})`;
    var t=winH-50;
    var newliT=Math.floor(Math.random()*(t-1));
    var newliL=danmu.clientWidth;
    newli.style.left=newliL + `px`;
    newli.style.top=newliT + `px`;
    danmu.appendChild(newli);
    move(newli);
}
function move(obj){
    var timer1=setInterval(function(){
        // var danmu=document.getElementById(`danmu`);
        var newliW=obj.clientWidth;
        var run=obj.offsetLeft;
        run--;
        if (run<=-newliW) {
            danmu.removeChild(obj);
            clearInterval(timer1);
        }
        obj.style.left=run+`px`;
    },1)
 }
 // insert();
var timer2=setInterval(function(){
     insert();
 },1000);
window.onfocus=function (){
    clearInterval(timer2);
    timer2=setInterval(function(){
        insert();
    },1000);
}
window.onblur=function (){
    clearInterval(timer2);
}
