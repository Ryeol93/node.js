const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const prot = 3000;
const router = express.Router();

app.use(bodyparser.urlencoded({extended: false}));
app.use(logger('dev'));

let database;
let UserSchema;
let UserModel;

router.route('/regist').post((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, gneder:${gender}`);

    if(database){
        joinUser(userid, userpw, name, gender, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패(서버에러!)</h2>');
                res.end();
            }else{
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.end();
                }
            }
        })
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});

router.route('/login').post((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw${userpw}`);

    if(database){
        loginUser(userid, userpw, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패(서버오류!)</h2>');
                res.end();
            }else{
                if(result){
                    console.dir(result);
                    const name = result[0].name;
                    const gender = result[0].gender;
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write(`<h2>아이디 : ${userid}</h2>`);
                    res.write(`<h2>이름 : ${name}</h2>`);
                    res.write(`<h2>성별 : ${gender}</h2>`);
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.end();
                }
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});


router.route('/list').get((req, res) => {
    if(database){
        UserModel.findAll((err, result) => {
            if(err){
                console.log('로그인 조회 실패');
                return;
            }else{
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원 리스트</h2>');
                    res.write('<div><ul>');
                    for(let i=0; i<result.length; i++){
                        const userid = result[i].userid;
                        const name = result[i].name;
                        const gender = result[i].gender;
                        
                        res.write(`<li>${i} : ${userid} / ${name} /${gender} </li>`)
                    }
                    res.write('</ul></div>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원 정보가 없습니다.</h2>');
                    res.end();
                }
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});




const joinUser = function(userid, userpw, name, gender, callback){
    const users = new UserModel({userid:userid, userpw:userpw, name:name, gender:gender});
    users.save((err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            callback(null, result);
        }
    });
    
}


const loginUser = function(userid, userpw, callback){
    UserModel.find({userid:userid, userpw:userpw}, (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.length > 0){
                console.log('일치하는 사용자를 찾음');
                callback(null, result);
            }else{
                console.log('일치하는 사용자가 없음');
                callback(null, null);
            }
        }
    });
}


function connectDB(){
    const uri = "mongodb://127.0.0.1:27017/frontend";
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    database = mongoose.connection;
    database.on('error', console.error.bind(console, "mongoose 연결 실패!"));
    database.on('open', () => {
        console.log('데이터베이스 연결 성공!');
        UserSchema = mongoose.Schema({
            userid:String,
            userpw:String,
            name:String,
            gender:String
        });
        console.log('UserSchema 생성 완료!');

        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
        });

        UserModel = mongoose.model('user', UserSchema);
        console.log('UserModel이 정의되었음!');
    });
}


app.use('/', router);

app.listen(prot, () => {
    console.log(`${prot}번 포트로 서버 실행중...`);
    connectDB();
});