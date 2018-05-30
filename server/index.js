var express = require('express');
var logger = require('morgan');                 // used for logging
var cookieParser = require('cookie-parser');    // storing user cookies
var bodyParser = require('body-parser');        // sending json
var mongoose = require('mongoose');             // using data modeling library for mongo

var authRoutes = require('./routes/auth');      

var app = express();

mongoose.connect('mongodb://localhost:27017/afrihost');


app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
