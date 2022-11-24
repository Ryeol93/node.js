const {Schema} = require('mongoose');

const crypto = require('crypto');

Schema.createSchema = function(mongoose){
    console.log('createSchema() 호출!');
    const MemberSchema = mongoose.Schema({
        userid: {type:String, require:true, default:''}, 
        hashed_password: {type:String, default:''},
        name: {type:String, defudefaultalt:''},
        salt: {type:String},
        age: {type:Number, default:0},
        created_at: {type:Date, default:Date.now},
        updated_at: {type:Date, default:Date.now},
        provider: {type:String, default:''},
        authToken: {type:String, default: ''},
        facebook: {}
    });

    MemberSchema.virtual('userpw')
        .set(function(userpw){
            this._userpw = userpw;
            this.salt = this.makeSalt();
            this.hashed_password = this.encrytPassword(userpw); 
        })
        .get(function(){
            return this._userpw;
        });

        MemberSchema.method('makeSalt', function(){
            console.log('makeSalt() 호출');
            return Math.round((new Date().valueOf() * Math.random())) + '';
        });

        MemberSchema.method('encrytPassword', function(plainText, inSalt){
            if(inSalt){
                return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
            }else{
                return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
            }
        });
        
        MemberSchema.method('authenticate', function(plainText, inSalt, hashed_password){
            if(inSalt){
                console.log('authenticate() 호출!, inSalt 있음');
                return this.encrytPassword(plainText, inSalt) == hashed_password;
            }else{
                console.log('authenticate() 호출!, inSalt 없음');
                return this.encrytPassword(plainText) == this.hashed_password;
            }
        });

        MemberSchema.pre('save', (next) => {
            if(!this.isNew) return next();

            if(!validatePresenceof(this.userpw)){
                next(new Error('유효하지 않은 password입니다.'))
            }else{
                next();
            }
        });

        const validatePresenceof = function(value){
            return value && value.length;
        }

        console.log('MemberSchema 정의 완료!');
        return MemberSchema;
}


module.exports = Schema;