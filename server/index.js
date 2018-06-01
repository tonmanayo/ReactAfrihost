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

app.use('/auth', authRoutes);

app.listen(6000, () => console.log('Example app listening on port 6000!'));
