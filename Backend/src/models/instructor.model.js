const mongoose = require('mongoose');


const instructorSchema = new mongoose.Schema({
    instructorID:{
        type: Number
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
    },
    guidanceDissertations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guidance',
    }
});


const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
