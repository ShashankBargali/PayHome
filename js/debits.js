const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    Name:String,
    Age:Number,
    acno: {
        type: Number,
        unique: true
    },
    Password: String,
    Balance: {
        type: Number,
        default: 0
    },
    CardNo: String,
    Cvv: Number,
    ExpDate: String,
    mPin: Number,
    qrCoded: String,
    gotCard: {
        type: Boolean,
        default: false
    }
})

let debits = mongoose.model('debits', userSchema);
module.exports = debits;