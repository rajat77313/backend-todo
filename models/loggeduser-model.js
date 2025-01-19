const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const loggeduserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    userId: {
        type: String
    }
})


const LoggedUser = new mongoose.model("LoggedUser", loggeduserSchema);

module.exports = LoggedUser