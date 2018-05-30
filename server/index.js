var express = require('express');
var logger = require('morgan');                 // used for logging
var cookieParser = require('cookie-parser');    // storing user cookies
var bodyParser = require('body-parser');        // sending json
var mongoose = require('mongoose');             // using data modeling library for mongo

var authRoutes = require('./routes/auth');      




var app = express();



app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
   res.send('GET request to homepage')
});

app.post('/', function (req, res) {
    res.send('POST request to homepage')
});