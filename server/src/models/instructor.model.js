const mongoose = require('mongoose');


const instructorSchema = new mongoose.Schema({
    instructorID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String
    },
    isAccept: {
        type: Boolean,
        default: false
    },
    specialization: {
        type: String
    }
});


const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
