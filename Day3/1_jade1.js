const express = require('express');
const fs = require('fs');
// npm i jade
const jade = require('jade');

const app = express();
const port = 3000;

const router = express.Router();

router.route('/about').post((req, res) => {
    fs.readFile('./jade1.jade', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            //compile을 먼저 해줘야한다.
            const jd = jade.compile(data);
            res.writeHead(200, {'content-type':'text/html'});
            //데이터를 보낼때 함수형식으로 보낸다 jd()
            res.end(jd());
        }
    });
});


app.use('/', router);

app.all('*', (req, res) =>{
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});