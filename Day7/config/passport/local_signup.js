// 패스포트 로컬 회원가입
const LocalStrateegy = require('passport-local').Strategy;

module.exports = new LocalStrateegy({
    usernameField: 'userid',
    passwordField: 'userpw',
    passReqToCallback: true
}, (req, userid, userpw, done) => {
    const name = req.body.name;
    const age = req.body.age;
    console.log(`passport의 local-signup 호출 : userid:${userid}, userpw:${userpw}, name:${name}, age:${age}`);

    process.nextTick(() => {
        let database = req.app.get('database');
        database.MemberModel.findOne({userid:userid}, (err, user) => {
            if(err){
                return done(err);
            }
            if(user){ 
                console.log('이미 가입된 계정');
                return done(null, false);
            }else{
                const user = new database.MemberModel({userid:userid, userpw:userpw, name:name, age:age});
                user.save((err) => {
                    if(err){
                        throw err;
                    }
                    console.log('가입 완료');
                    return done(null, user);
                });
            }
        });
    });
});