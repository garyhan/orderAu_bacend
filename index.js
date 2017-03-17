var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./model/schemas');
var userRouter = require('./router/userRouter');
var productRouter = require('./router/productRouter');


app.use(bodyParser.json());
//获取配置信息并且写入到项目中
app.use(function(req, res, next) {
    next();
});
app.use('/user', userRouter);
app.use('/product', productRouter);
app.listen(3000);