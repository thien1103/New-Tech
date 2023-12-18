const mongoose = require('mongoose');

const guidanceSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
 
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',

    },
    dissertation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dissertation',

    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
   
});

const Guidance = mongoose.model('Guidance', guidanceSchema);

module.exports = Guidance;
