//https类
var http = require("http");
var url = require("url");
//文件操作类
var fs = require("fs");
// cors
var cors = require("cors");

/** 构建html页 */
var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(cors());

app.get("/pdf/*", (req, res) => {
  console.log("get request");
  res.append("Content-Type", "application/json;charset=utf-8");
  res.send(JSON.stringify({ name: "ganxz" }));
  // fs.readFile("./static/2.pdf", function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(data);
  //   }
  // });
});
app.post("/pdf/*", (req, res) => {
  console.log("post request");
  var pathname = url.parse(req.url).pathname;
  fs.readFile("./public/" + pathname, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

var httpsServer = http.createServer({}, app);
httpsServer.listen(8088);

// //http 静态路由
// htmlApp.use(express.static("htmlTest")).listen(8080);
console.log("start listen 8088");
