// Trong file registrationPeriod.model.js hoặc tương tự
const mongoose = require('mongoose');

const registrationPeriodSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    startDate: {
        type: Date,
        
    },
    endDate: {
        type: Date,
        
    },
    semester: {
        semesterNumber: {
        type: String,
        enum: ['1', '2', '3'],
        
    },
    }          

    // Các trường thông tin khác liên quan đến đợt đăng ký đề tài có thể được thêm vào tùy ý.
});

const RegistrationPeriod = mongoose.model('RegistrationPeriod', registrationPeriodSchema);

module.exports = RegistrationPeriod;
