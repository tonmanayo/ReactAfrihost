const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const Schema = new mongoose.Schema({
    cellNumber: {type: String, required: true},
    companyName: {type: String},
    faxNumber: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    idNumber: {type: Number, required: true, unique: true},
    telNumber: {type: String},
    username: {type: String, required: true},
    password: {type: String}
});

Schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', Schema);