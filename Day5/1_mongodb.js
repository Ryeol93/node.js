const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;

let database;

app.use(bodyParser.urlencoded({extended: false}));

// 회원가입
// htttp://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출 성공!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, gender:${gender}`);

    if(database){
        joinMember(database, userid, userpw, name, gender, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type': 'text/thml;charset=utf8'});
                res.write('<h2>회원가입 실패<h2>');
                res.write('<p>오류가 발생했습니다.</p>');
                res.end();
            }else{
                if(result.insertedCount > 0){
                    res.writeHead('200', {'content-type': 'text/thml;charset=utf8'});
                    res.write('<h2>회원가입 성공!<h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type': 'text/thml;charset=utf8'});
                    res.write('<h2>회원가입 실패<h2>');
                    res.write('<p>회원가입에 실패하였습니다.</p>');
                    res.end();
                }
            }
        });
    }else{
        res.writeHead('200', {'content-type': 'text/thml;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패<h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});


const joinMember = function(database, userid, userpw, name, gender, callback){
    console.log('joinMember 호출!');
    const members = database.collection('member');
    members.insertMany([{userid:userid, userpw:userpw, name:name, gender:gender}], (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.insertedCount > 0){
                console.log(`사용자 document ${result.insertedCount}명이 추가 되었습니다.`);
            }else{
                console.log(`사용자 document 추가되지 않았습니다.`);
            }
            callback(null, result);
        }
    });
}

// 몽고디비 연결 함수
function connectDB(){
    const databaseURL = "mongodb://127.0.0.1:27017";
    MongoClient.connect(databaseURL, (err, db) => {
        if(err){
            console.log(err);
        }else{
            const temp = db.db('frontend');
            database = temp;
            console.log('mongodb 데이터베이스 연결 성공!');
        }
    });
}

app.use('/', router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중`);
    connectDB();
});