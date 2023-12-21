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
    task: {
        title: String,
        description: String,
        deadline: Date,
        completion: {
            type: Number,
            default: 0, // Giá trị mặc định là 0%, có thể thay đổi tùy thuộc vào logic của bạn
        },
        instructionsFile: String,
        documentUrl: {
            type: String,
            validate: {
                validator: function (value) {
                    // Validate that the file has a GIF extension
                    return /\.(gif)$/i.test(value);
                },
                message: 'Only GIF files are allowed.',
            },
        },
    },
   
});

const Guidance = mongoose.model('Guidance', guidanceSchema);

module.exports = Guidance;
