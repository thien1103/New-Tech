const mongoose = require('mongoose');


const dissertationSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    StudentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    InstructorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
    },
    CouncilID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Council',
    },
    isInstructorAccept: {
        type: Boolean,
        default: false,
    },
    Duration: {
        type: Date,
    },
    Status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'InProgress', 'Completed'],
    },
    // Mảng các ID của sinh viên đã đăng ký cho đề tài
    registeredStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
});


const Dissertation = mongoose.model('Dissertation', dissertationSchema);

module.exports = Dissertation;
