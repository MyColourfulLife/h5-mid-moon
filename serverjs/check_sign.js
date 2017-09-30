var sign = require("./sign.js");
var axios = require("axios");
var jsonfile = require("jsonfile");

// 获取 accesss_token
var appid = "wx0ec218cba03bd6ea";
var secret = "97d5d87a812f1184c347ee7f489ab9e7";
var token_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
var config_url = "http://275640e2.ngrok.io/";
var signjson = "./serverjs/sign.json";



// 先执行一次
refesh_token_tickte();
// 创建定时器 每隔1.8小时 刷新一次 token 和ticket
setInterval
var timer = setInterval(refesh_token_tickte,1000 * 60 * 60 *1.8);
/**
 * 舒心token和ticket
 */
function refesh_token_tickte() {
    getaccess_token(token_url, getjsapi_ticket);
}

/**
 * 获取token
 * @param {*url} 获取token的url地址 
 * @param {*callback} callback 
 */
function getaccess_token(url, callback) {
  console.log("正在请求token");
  axios
    .get(token_url)
    .then(function(response) {
      if (!response || !response.data || !response.data.access_token) {
        console.log("未获取到token");
        callback(null, null);
        return;
      }
      callback(null, response.data.access_token);
    })
    .catch(function(err) {
      callback(err, null);
    });
}

/**
 * 回调函数 
 * 根据token获取jsapi_ticket
 * 同时 会生成 签名 并保存到本地
 * @param {*} err 
 * @param {*} token 
 */
function getjsapi_ticket(err, token) {
  if (err || !token) {
    console.log("获取token失败");
    return;
  }
  var jsapi_ticket = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  axios
    .get(jsapi_ticket)
    .then(function(response) {
      if (!response || !response.data || !response.data.ticket) {
        console.log("未获取到jsapi_ticket", response.data.errmsg);
        return;
      }
      //只存储签名
      try {
        jsonfile.writeFileSync(signjson, {
            access_token:token,
            jsapi_ticket:response.data.ticket
        }, { spaces: 2 });
        console.log("token写入成功");
      } catch (error) {
        console.log("写入文件失败", error.message);
      }

    })
    .catch(function(error) {
      if (error) {
        console.log("获取jsapi_ticket失败", error.message);
      }
    });
}


/**
 * 根据url动态生成签名
 * @param {*configurl} url 
 */
function createCoinfDynamic(url) {
    console.log('要配置的url是',url);
  try {
    //1. 从文件中读取 ticket
    var signinfo = jsonfile.readFileSync(signjson);
    var ticket = signinfo.jsapi_ticket;
    var token = signinfo.access_token;
    //2. 生成签名
    var signature = sign(ticket, url);
    //3. 补充参数 并返回
    signature.appId = appid;
    signature.jsApiList = [
      "chooseImage",
      "uploadImage",
      "menuItem:share:appMessage",
      "menuItem:share:timeline",
      "getNetworkType"
    ];
    signature.token = token;
    return signature;
  } catch (err) {
    console.log("动态生成签名出错",err.message);
    return null;
  }
}




module.exports = createCoinfDynamic;