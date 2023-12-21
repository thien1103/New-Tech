const mongoose = require('mongoose');


const councilSchema = new mongoose.Schema({
    councilID: {
        type: Number,
        required: true,
        unique: true
    },
    teacher1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor' // Tham chiếu đến mô hình Instructor
    },
    teacher2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    teacher3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }
});


const Council = mongoose.model('Council', councilSchema);

module.exports = Council;
