var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
        required: true,
    },
    lastName: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    empId:{
        type: String,
        default: '',
        required: true,
        unique: true
    },
});

var user = new mongoose.model('Employee', schema);

module.exports = user;