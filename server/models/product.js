const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const Schema = new mongoose.Schema({
    createdAt: {type: Date, required: true},
    friendlyName: {type: String, required: true},
    isPaused: {type: Boolean, required: true},
    status: {type: String, required: true},
    uid: {type: String, required: true, unique: true},
    updatedAt: {type: Date, required: true}
});

Schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Product', Schema);