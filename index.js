const http = require('http');
const fs = require('fs');
const path = require('path');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const setCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};
const server = http.createServer((req, res) => {
    // 获取请求的文件名
    let filePath = path.join(__dirname, req.url);
    // 如果请求的是根目录，返回index.html
    if (filePath === path.join(__dirname, '/')) {
        filePath = path.join(__dirname, 'index.html');
    }
 
    // 读取文件内容并发送响应
    fs.readFile(filePath, (err, data) => {
        setCORSHeaders(res)
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error loading file');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/javascript');
            res.end(data);
        }
    });
});
 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});