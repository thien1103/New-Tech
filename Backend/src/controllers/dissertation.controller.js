// dissertation.controller.js

const Dissertation = require('../models/dissertation.model'); // Đường dẫn đến mô hình Dissertation

async function ensureRegisteredStudentsField() {
    try {
        const dissertations = await Dissertation.find().exec();

        for (const dissertation of dissertations) {
            if (!dissertation.registeredStudents) {
                dissertation.registeredStudents = [];
                await dissertation.save();
            }
        }

        console.log('Đã cập nhật trường registeredStudents cho các đề tài thành công.');
    } catch (error) {
        console.error('Lỗi khi cập nhật trường registeredStudents:', error);
    }
}

module.exports = {
    ensureRegisteredStudentsField,
};
// dissertation.controller.js

const Dissertation = require('../models/dissertation.model'); // Đường dẫn đến mô hình Dissertation

async function ensureRegisteredStudentsField() {
    try {
        const dissertations = await Dissertation.find().exec();

        for (const dissertation of dissertations) {
            if (!dissertation.registeredStudents) {
                dissertation.registeredStudents = [];
                await dissertation.save();
            }
        }

        console.log('Đã cập nhật trường registeredStudents cho các đề tài thành công.');
    } catch (error) {
        console.error('Lỗi khi cập nhật trường registeredStudents:', error);
    }
}

module.exports = {
    ensureRegisteredStudentsField,
};
