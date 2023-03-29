const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    acno: {
        type: Number,
        unique: true
    },
    password: String,
    pin: Number,
    balance: {
        type: Number,
        default: 0
    },
    digipay: {
        type: Boolean,
        default: false
    }
})

let users = mongoose.model('users', userSchema);
module.exports = users;