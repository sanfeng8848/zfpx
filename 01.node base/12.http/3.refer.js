const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("mz/fs");

const server = http.createServer(responseImages); // 创建服务器
let static = path.resolve(__dirname, "public"); // 静态资源目录
let whiteList = ["shen.com"]; // 白名单

async function responseImages(req, res) {
  // 解析 url 中的文件目录处理成绝对路径
  let p = path.join(static, url.parse(req.url).pathname);

  // 检测文件路径是否合法，不合法直接返回 Not Found
  let isExist = await fs.exists(p);

  if (isExist) {
    // 获取 referer
    let refer = req.headers["referer"] || req.headers["referered"];

    // 存在 referer 继续检测
    if (refer) {
      // 请求资源存在 referer，做防盗链处理
      let referHost = url.parse(refer).hostname;
      let host = req.headers["host"].split(":")[0];

      // 当访问源的域和资源所在的域不是同一个域，做防盗链处理
      if (referHost !== host) {
        let isInWhiteList = whiteList.includes(refer);
        p = isInWhiteList ? p : path.join(static, "error.png");
      }
    }

    // 第一次访问请求页面 index.html，不存在 referer，将静态资源返回
    // 第二次访问请求图片资源，如果 referer 和资源所本就是同一个域，直接将资源返回
    fs.createReadStream(p).pipe(res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}

server.listen(3000, () => {
  console.log("server start 3000");
});