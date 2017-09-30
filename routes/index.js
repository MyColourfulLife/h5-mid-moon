var express = require('express');
var router = express.Router();
var get_config = require("../serverjs/check_sign.js");
var axios = require('axios');

router.use(function (req,res,next) {
  console.log('收到请求',req.url);
  next();
});

router.get('/wechatconfig',function (req,res) {
// 获取微信注册配置信息
  var requesturl = req.url;
  var configurl = requesturl.split("xxconfigurl=")[1].split('#')[0];
  var config = get_config(configurl);
  res.send(config);
});

/**
 * 判断是否是月亮
 * 需要图片地址参数
 */
router.get('/ismoon',function (req,res) {
  console.log('收到一条请求');
  var imgurl = req.query.imgurl;
  if (!imgurl) {
    res.json({
      message:'图片地址为空'
    });
    return;
  }
  

var encodeurl = encodeURIComponent(imgurl);

  var requesturl = `http://119.23.153.216:80/api/get_image_class_url?image_url=${encodeurl}&model_name=moon_model`
  console.log('要识别的url',requesturl);
  axios.get(requesturl).then(function (response) {
    
    var ismoon = response.data.recResult[0].imageClass === "moon";
    console.log(ismoon);
    res.json({
      isMoon:ismoon
    });

  }).catch(function (err) {
    console.log(err);
    res.send(err);
  });
});

// router.get('/share',function (req,res) {
  
//       var words = req.query.saytomoon;
  
//       if (!words || words === "undefined") {
//         res.send("<h3>你的心一片空白</h3>");
//         return;
//       }
  
//       res.render('share.ejs',{
//         shareUrl:`http://www.id-bear.com/node/moon/moon?saytomoon=${words}`
//       });
  
//     });


/* GET home page. */
router.get('/', function(req, res, next) {

// 默认数据
  var avator = "images/sharedavator.jpg";
  var words = "我是真的好想你";
  var nickname = "——你的好友对你说";

  //微信服务器校验
  if (req.query.echostr) {
    console.log('收到微信校验',req.query);
    res.send(req.query.echostr);
    return;
  }

  var randint = Math.round(Math.random()*100) % 80 + 1;
  var randAvtor = `avatorimgs/avator${randint}.jpg`
  // 获取用户参数
  if (req.query.saytomoon && req.query.saytomoon != 'null' && req.query.saytomoon.length > 0) {
    avator = randAvtor,
    words = req.query.saytomoon,
    nickname = "——你的好友对你说"
  }


  // 使用模型渲染网页
  res.render('index', { 
    avator:avator,
    words:words,
    nickname:nickname
  });
});

module.exports = router;
