const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const static = require('serve-static');
const path = require('path');
const expressErrorHandler = require('rexpress-error-handler');
const passport= require('passport');

const app = express();
const router = express.router();

app.use(cookieParser());
app.use(expressSession({
    secret: '!@#$%^&*()',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(logger('dev'));
app.use(passport.initialize()); // 패스포트 초기화
// passport의 세션을 사용하려면 반드시 express의 세션 코드가 먼저 설정 되어야한다.
app.use(passport.session());
app.use(bodyparser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/', router);



const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.listen(prot, () => {
    console.log(`${prot}번 포트로 서버 실행중...`);
    connectDB();
});