const http = require('http');

http.createServer((req, res) => {
    //html로 응답하겠다
    res.writeHead(200, {'content-type' : 'text/html'});
    //end안에는 html전체가 들어가야 한다.(파일을 넣어도 가능)
    res.end("<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>http 모듈 테스트</title></head><body><h2>http 모듈 테스트</h2><p>처음으로 실행하는 Node.js http 서버</p></body></html>")
}).listen(3000, () =>{
    console.log('3000번 포트로 서버 실행중 ...');
});