
function createDanmuItem(words,img='avatorimgs/avator66.jpg',bottom = 30,color = 'white',speed=10) {
  return {
  img:img, //图片 
  info:words, //文字 
  close:false, //显示关闭按钮 
  speed:speed, //延迟,单位秒,默认8
  bottom:bottom, //距离底部高度,单位px,默认随机 
  color:color, //颜色,默认白色 
  old_ie_color:'#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
  }
}

var danmubottoms = [30,60];

//每条弹幕发送间隔
var looper_time=3*1000;
// var items=data;
//弹幕总数
// var total=data.length;
//是否首次执行
var run_once=true;
//弹幕索引
var index=0;
//先执行一次
barrager();
function  barrager(){
  if(run_once){
      //如果是首次执行,则设置一个定时器,并且把首次执行置为false
      looper=setInterval(barrager,looper_time);                
      run_once=false;
  }
  //发布一个弹幕
  var word = danmuwords[index%danmuwords.length];
  var img = `avatorimgs/avator${(index%80)+1}.jpg`
  var bottom = danmubottoms[index%danmubottoms.length];
  $('.danmuArea').barrager(createDanmuItem(word,img,bottom));
  //索引自增
  index++;
  if (index === 100000) {
    index = 0;
  }
}



