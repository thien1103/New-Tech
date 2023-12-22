const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        ref: "instructor",
        ref: "manager",
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
        }
      ]
});


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
