const mongoose = require('mongoose');

const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
     
    },
    
    description: {
        type: String,
    },
    // Các trường thông tin khác liên quan đến chuyên ngành có thể được thêm vào tùy ý.
});

const Specialization = mongoose.model('Specialization', specializationSchema);

module.exports = Specialization;
