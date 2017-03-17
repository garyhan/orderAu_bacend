var express = require('express');
var router = express.Router();

var returnMsg = require('../util/returnStruct');
var mongoose = require('mongoose');

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res, next) {
    res.send('hello boy');
});

router.get('/check/:username', function(req, res, next) {
    var userBase = mongoose.model('user_base');
    userBase.checkUsername(req.params.username).then((result) => {
        console.log(result);
        res.send(result);
    })
});

/**
 * 添加用户信息
 */
router.post('/', function(req, res, next) {
    var userBase = mongoose.model('user_base');
    var ub = new userBase(req.body);
    ub.regUser(req.body).then((msg) => {
        console.log(msg);
        res.send(msg);
    })
});

/**
 * 查找用户
 */
router.get('/:id', function(req, res) {
    var userBase = mongoose.model('user_base');
    userBase.findOne({ '_id': req.params.id }, function(err, user) {
        console.log(user);
        res.send(returnMsg(200, user));
    });
    console.log('id=' + req.params.id);

});

module.exports = router;