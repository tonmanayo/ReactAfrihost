const express = require('express');
const router = express.Router();              // using express router
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');       // model to signup users

router.post('/', (req, res, next) => {
    return res.status(500).json({
        title: 'An error occurred',
        err: {message: 'user authentication failed'}
    });
});

router.post('/signup', (req, res, next) => {
    let user = new User({
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
    user.save((err, result) => {
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

router.post('/signin', (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
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

        const token = jwt.sign({user: user}, 'Afrihost', {expiresIn: 604800});  //Tuesday 14 August, guessing 1 week
        res.status(201).json({
            message: 'login successful',
            token: token,
            userId: user._id
        })
    });
});

module.exports = router;