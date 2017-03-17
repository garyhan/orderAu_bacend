/**
 * 返回结果拼装类
 *  code 返回代码
 *  data 返回的数据
 *  message 返回的自定义内容 
 * 
 * 返回值
 * {
 *  code :传入的code
 *  message :如果传入提示内容使用传入提示内容,未传入使用错误文件中默认提示
 *  data:需要返回的具体数据内容 可不传入
 * }
 **/
var errorMsg = require('./ErrorMessage');

function returnStruct(code, data, message) {
    var result = {};
    if (!code)
        throw new Exception('必须有返回代码');
    result.code = code;
    if (message)
        result.msg = message;
    else
        result.msg = errorMsg[code]

    if (data)
        result.data = data;
    return result;
}

module.exports = returnStruct;