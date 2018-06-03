import express from 'express';
import logger from 'morgan';                 // used for logging
import cookieParser from 'cookie-parser';    // storing user cookies
import bodyParser from 'body-parser';        // sending json
import mongoose from 'mongoose';             // using data modeling library for mongo

import authRoutes from'./routes/auth';

const app = express();

mongoose.connect('mongodb://localhost:27017/afrihost');
app.use(logger('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use('/auth', authRoutes);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
