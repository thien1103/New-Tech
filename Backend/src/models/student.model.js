const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    studentID:{
        type: Number,
    },

    name: {
        type: String,
    },
    studentCode: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    email: {
        type: String,
        sparse: true,
        unique: true,
    },
    birthday: {
        type: Date,
    },
    password: {
        type: String,
    },
    classs: {
        type: String,
    },
    phone: {
        type: String,
    },
    department: {
        type: String,
    },
    isAccept: {
        type: Boolean,
        default: false,
    },
    registeredDissertations: [{
        dissertation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guidance',
        },
        status: {
            type: String,
            enum: ['Chờ xét duyệt', 'Đã xét duyệt', 'Từ chối'],
            default: 'Chờ xét duyệt',
        },
    }],

});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
