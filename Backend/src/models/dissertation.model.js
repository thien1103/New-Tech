const mongoose = require('mongoose');


const dissertationSchema = new mongoose.Schema({

    dissertationID: {
        type: Number,
        // unique: true, // Bỏ comment dòng này nếu đã có
    },
    Name: {
        type: String,
        
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
    specializationID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization',
    }],
    RegistrationPeriodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegistrationPeriod',
    },
    CouncilID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Council',
    },
    isInstructorAccept: {
        type: Boolean,
        default: false,
    },
    Status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'InProgress', 'Completed'],
    },
    departmentHeadApproval: {
        type: Boolean,
        default: false,
    },
    departmentHeadComment: {
        type: String,
    },
    defenseReview: [{
        assignedInstructorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
        },
        comments: {
            type: String,
        },
    }],

    
},{ limit: false });


const Dissertation = mongoose.model('Dissertation', dissertationSchema);

module.exports = Dissertation;
