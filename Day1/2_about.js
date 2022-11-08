// http라는 기능을 http(모듈기능)에 라는 객체에 저장
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//createServer 웹서버를 만드는 역할
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//실행 방법 : 웹브라우저에서 hostname:port 적으면 나온다