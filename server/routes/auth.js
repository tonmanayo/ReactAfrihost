var express = require('express');
var router = express.Router();              // using express router
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');       // model to signup users

router.post('/', function(req, res, next) {
    return res.status(500).json({
        title: 'An error occurred',
        err: {message: 'user authentication failed'}
    });
});

router.post('/signup', function(req, res, next) {
    var user = new User({
        cellNumber: req.body.cellNumber,
        companyName: req.body.companyName,
        faxNumber: req.body.faxNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        idNumber: req.body.idNumber,
        telNumber: req.body.telNumber,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)

    });
    user.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'error occurred',
                error: err
            })
        }
        res.status(201).json({
            title: 'user created',
            obj: result
        });
    })
});

router.post('/signin', function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err){
            return res.status(500).json({
                title: 'error occurred',
                error: err
            });
        }

        if (!user || !bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'login failed',
                error: {message: 'Invalid login details'}
            });
        }

        var token = jwt.sign({user: user}, 'Afrihost', {expiresIn: 604800});  //Tuesday 14 August, guessing 1 week
        res.status(201).json({
            message: 'login successful',
            token: token,
            userId: user._id
        })
    });
});

module.exports = router;