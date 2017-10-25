var express = require('express');
var http = require('http');
var app = express();
var fetch = require('node-fetch');
var sha1 = require('sha1');
var bodyParser = require('body-parser');
var sign = require('./sign.js');
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send({id: 1})
})
app.post('/share', function (req, res) {
  var href = req.body.href
  fetch('http://hljwap.juecn.cn/index.php?r=api/default/getjsticket')
    .then(function (res) {
      return res.json();
    }).then(function (json) {
    var noncestr = randomString();
    var timestamp = Date.now().toString().substr(0, 10);
    var jsapi_ticket = json.jsticket;
    var url = decodeURIComponent(href);
    var obj = sign(jsapi_ticket, url);
    res.send(obj)
  });
})

function randomString(len) {
  len = len || 16;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

app.listen(8087, function () {
  console.log('success8087')
})




