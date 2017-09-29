var express = require('express');
var router = express.Router();
var get_config = require("../serverjs/check_sign.js");

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

  // 使用模型渲染网页
  res.render('index', {
    avator:avator,
    words:words,
    nickname:nickname
  });
});

module.exports = router;
