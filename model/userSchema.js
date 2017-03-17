var mongoose = require('mongoose');
var Promise = require('bluebird');
var returnMsg = require('../util/returnStruct');
var tools = require('../util/tools');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    regDate: Date,
    lastLogin: Date,
    errorNum: Number,
    userType: String,
    psw: String,
    statu: Number
});
userSchema.method('regUser', function(userinfo) {
    return new Promise((resolve, reject) => {
        if (!this.username) {
            return resolve(returnMsg('405', null, '必须传入用户名才能进行注册'));
        } else if (this.psw !== userinfo.rpsw) {
            return resolve(returnMsg('405', null, '两次输入的密码不一样'));
        }
        this.model('user_base').find({ username: this.username }, (msg, res) => {
            if (res.length !== 0) {
                return resolve(returnMsg('405', null, '用户已经被注册不能重复注册!'));
            }
            //对密码进行MD5加密
            this.psw = tools.md5Fn(this.psw);
            this.save();
            resolve(returnMsg(200));
        });
    });
});

userSchema.static('checkUsername', function(username) {
    console.log(username);
    return new Promise((resolve, reject) => {
        this.count({ username: username }, (error, count) => {
            if (!count) return resolve(returnMsg(200, '可以注册'))
            else return resolve(returnMsg(601))
        });
        // resolve(200);
    });
});

module.exports = userSchema;