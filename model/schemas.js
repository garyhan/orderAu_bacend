/**
 * 数据连接
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/order_au');

mongoose.model('user_base', require('./userSchema'));

module.exports = db;