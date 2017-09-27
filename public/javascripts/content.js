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
      var danmu = document.getElementById(`danmu`);
      var winH = danmu.clientHeight;
      var speak = this.dmlists;
      function insert() {
        var newli = document.createElement(`div`);
        var randomS = Math.floor(Math.random() * speak.length);
        var r = Math.floor(Math.random() * 266);
        var g = Math.floor(Math.random() * 266);
        var b = Math.floor(Math.random() * 266);

        var pserson = speak[randomS];
        var content = `<span> <img src=${pserson.avator}> ${pserson.nickname}:${pserson.words} </span>`;
        newli.innerHTML = content;
        newli.className = `newli`;
        newli.style.color = `rgb(${r}, ${g} ,${b})`;
        var t = winH - 30;
        var newliT = Math.floor(Math.random() * (t - 1));
        var newliL = danmu.clientWidth;
        newli.style.left = newliL + `px`;
        newli.style.top = newliT + `px`;
        danmu.appendChild(newli);
        move(newli);
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
        }, 1);
      }
      // insert();
      var timer2 = setInterval(function() {
        insert();
      }, 1000);
      window.onfocus = function() {
        clearInterval(timer2);
        timer2 = setInterval(function() {
          insert();
        }, 1000);
      };
      window.onblur = function() {
        clearInterval(timer2);
      };
    }
  }
});

app.startDm();


