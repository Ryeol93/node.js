 const express = require('express');
 const app = express();
 const port  = 3000;

 app.get('/', (req, res) => {
    //헤더는 기본 html로 보낸다.
    res.send('익스프레스 서버 테스트');
 });

 app.listen(port, () =>{
    console.log(`${port}포트로 서버 실행중...`);
 });