var express = require('express');
var router = express.Router();
var get_config = require("../serverjs/check_sign.js");
var axios = require('axios');

router.get('/wechatconfig',function (req,res) {
// 获取微信注册配置信息
  var requesturl = req.url;
  var configurl = requesturl.split("xxconfigurl=")[1].split('#')[0];
  var config = get_config(configurl);
  res.send(config);
});


router.get('/',function (req,res) {
    console.log('准备分享');
      var words = req.query.saytomoon;
  
      if (!words || words === "undefined") {
        res.send("<h3>你的心一片空白</h3>");
        return;
      }
  
      res.render('share.ejs',{
        shareUrl:`http://www.id-bear.com/node/moon/moon?saytomoon=${words}`
      });
  
    });


module.exports = router;
