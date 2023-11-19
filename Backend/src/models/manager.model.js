const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    managerID:{
        type: Number,
        require: true,
        unique: true,
    } ,
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    birthdate: {
        type: Date,

    }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;