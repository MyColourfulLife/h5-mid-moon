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
  
  var imgurl = req.query.imgurl;
  if (!imgurl) {
    res.json({
      message:'图片地址为空'
    });
    return;
  }
  
  var requesturl = `http://119.23.153.216:80/api/get_image_class_url?image_url=${imgurl}&model_name=moon_model`
  axios.get(requesturl).then(function (res) {
    
    console.log(res);
    res.json({
      isMoon:res.data.recResult.imageClass === "moon"
    });

  }).chatch(function (err) {
    res.send(err);
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {

// 默认数据
  var avator = "images/sharedavator.jpg";
  var words = "都云作者痴，谁解其中味";
  var nickname = "山巅思";

  //微信服务器校验
  if (req.query.echostr) {
    console.log('收到微信校验',req.query);
    res.send(req.query.echostr);
    return;
  }


  // 获取用户参数
  if (req.query.nickname) {
    avator = req.query.avator,
    words = req.query.words,
    nickname = req.query.nickname
  }

  // var base_url = "http://275640e2.ngrok.io";

  // var requesturl = req.originalUrl;
  // var configurl = base_url + requesturl.split('#')[0];
  
  // var config = get_config(configurl);
  // console.log('请求的url',requesturl,'要配置的url',configurl,'获得的配置',config);

  // 使用模型渲染网页
  res.render('index', { 
    avator:avator,
    words:words,
    nickname:nickname,
    // wxconfig:{
    //   jsapi_ticket:config.jsapi_ticket,
    //   nonceStr:config.nonceStr,
    //   timestamp:config.timestamp,
    //   url:config.url,
    //   signature:config.signature,
    //   appId:config.appId,
    //   token:config.token,
    //   jsApiList:config.jsApiList
    // }
  });
});

module.exports = router;
