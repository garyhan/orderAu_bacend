var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/order_au');

router.use(function(req, res, next) {
    console.log('product Init');
    next();
});

router.get('/', function(req, res, next) {
    res.send('i am product');
});

router.get('/show', function(req, res, next) {
    res.send('helllooooooooo');
});

module.exports = router;