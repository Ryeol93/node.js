// 파일을 다루는 모듈
const fs = require('fs');

// 비동기식으로 파일을 읽기
// 비동기일경우 콜백함수 필수
// 못 읽을 경우 err로 / 읽을 경우 data로 
fs.readFile('text1.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음 : ${data}`);
    }
})

// 동기식으로 파일을 읽기
// 만약에 동기식도 에러가 난다면 비동기식으로 에러를 잡아주고 싶다면 -> 5_fs에서 배운다
const text = fs.readFileSync('text1.txt', 'utf-8');
console.log(`동기식으로 읽음 : ${text}`);