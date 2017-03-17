var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('./config');

var tools = {
    /**
     * MD5加密
     */
    md5Fn: function(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    },
    /**
     * JWT加密
     */
    JWTSign: function(json, timeout) {
        //默认有效期 7天
        if (!timeout) timeout = config.jwtDefaultExp;
        return jwt.sign(json, config.jwtSectret, { expiresIn: '7d' });
    },
    /**
     * JWT解密类
     * 首先验证当前token是否是合法的
     * 合法的将token解析后返回
     * 不合法的返回false
     */
    JWTDecode: function(token) {
        if (this.JWTVerify(token))
            return jwt.decode(token);
        else return 0;
    },
    /**
     * 验证token
     * 验证通过的 返回true 否则返回false
     */
    JWTVerify: function(token) {
        try {
            jwt.verify(token, config.jwtSectret);
            return true;
        } catch (e) {
            return false;
        }
    }
}

console.log(tools.JWTSign({ aaa: '11' }));
module.exports = tools;