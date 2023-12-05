const mongoose = require('mongoose');


const dissertationSchema = new mongoose.Schema({

    dissertationID: {
        type: Number,
        // unique: true, // Bỏ comment dòng này nếu đã có
    },
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

    
},{ limit: false });


const Dissertation = mongoose.model('Dissertation', dissertationSchema);

module.exports = Dissertation;
