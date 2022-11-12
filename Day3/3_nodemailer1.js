// npm i nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '구글메일주소',
        pass: '앱 비밀번호'
    },
    host: 'smtp.mail.com',
    port: 465
});

const mailOption = {
    from: '이름<구글메일주소>',
    to: '이름<보내는 메일주소>',
    subject: 'node.js로 보내는 메일',
    html: "<h2>안녕하세요. node.js로 보내는 메일입니다.</h2><p style='font-size: 15px; color: deeppink;'>정말 잘~~가나요?</p>"
};

transporter.sendMail(mailOption, (err, info) => {
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
    transporter.close()
});
