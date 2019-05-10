// const express = require('express')
// const app = express()
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
// app.listen(8080)

// app.get('/write', function (req, res) {
//   res.cookie('name', 'JERRY', {
//     domain: 'a.sanfeng.cn',
//     path: '/user'
//   })
//   res.end('OK')
// })

// app.get('/user', function (req, res) {
//   res.send(req.cookies)
// })



const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.listen(8080);
/**
 * Set-Cookie:name=zfpx; Domain=a.zfpx.cn; Path=/
 * domain 就是指定此cookie是属于哪些域名的
 */
app.get('/write', function (req, res) {
    res.cookie = function (key, val, options) {
        let { domain, path, maxAge, expires, httpOnly, secure } = options;
        let parts = [`${key}=${val}`];
        if (domain) {
            parts.push(`Domain=${domain}`);
        }
        if (path) {
            parts.push(`Path=${path}`);
        }
        if (maxAge) {
            parts.push(`Max-Age=${maxAge}`);
        }
        if (expires) {
            parts.push(`Expires=${expires.toUTCString()}`);
        }
        if (httpOnly) {
            parts.push(`httpOnly`);
        }
        if (secure) {
            parts.push(`Secure`);
        }
        let cookie = parts.join('; ');
        res.setHeader('Set-Cookie', cookie);
    }
    //Set-Cookie:name=zfpx; Domain=localhost; Path=/read2; Max-Age=10000; Expires=Wed, 07 M
    res.cookie('name', 'zfpx', {
        // maxAge: 30 * 1000,     // maxAge是以毫秒为单位
        path: '/read1',
        domain: 'localhost',
        expires: new Date(Date.now() + 30 * 1000),   // expires:是以毫秒为单位
        httpOnly: true,
        // secure: true   // cookie只能用https协议时,客户端才发送给服务器,也就是cookie是在https的情况下创建的
    });
    res.end('ok');
});
app.get('/read', function (req, res) {
    res.send(req.cookies);
});
app.get('/read1', function (req, res) {
    res.send(req.cookies);
});
app.get('/read1/1', function (req, res) {
    res.send(req.cookies);
});

