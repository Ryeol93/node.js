const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//engine을 등록하게 되면 views에서 ejs파일을 찾게된다.
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: false}));

const module1 = require('./router/module1')(app);

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});