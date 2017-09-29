var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //创建渲染模型

  var {datamodel} = {title:'明月知我心'}

// 默认数据
  var avator = "images/sharedavator.jpg";
  var words = "都云作者痴，谁解其中味";
  var nickname = "山巅思";

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
