const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    token :{
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isProfileVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
