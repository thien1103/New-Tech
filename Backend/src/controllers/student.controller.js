const Student = require('../models/student.model');
const Dissertation = require('../models/dissertation.model');


const studentController = {
    getProfileStudents : async (req, res) => {
        const studentId = req.params.studentId;

    try {
        // Kiểm tra xem sinh viên có tồn tại không
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Sinh viên không tồn tại.' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
    }
    },

    updateProfileStudent: async (req, res) => {
        const studentId = req.params.studentId;
    const { address, phone, email } = req.body;

    try {
        // Kiểm tra xem sinh viên có tồn tại không
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Sinh viên không tồn tại.' });
        }

        // Cập nhật thông tin cá nhân
        if (address) student.address = address;
        if (phone) student.phone = phone;
        if (email) student.email = email;

        await student.save();

        res.status(200).json({ success: 'Cập nhật thông tin cá nhân thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
    }
    },

    getALLDissertation: async (req, res) => {
        try {
            // Lấy tất cả các đề tài từ cơ sở dữ liệu
            const allDissertations = await Dissertation.find();
    
            res.status(200).json(allDissertations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },

    registerDissertation: async (req, res) => {
        const studentId = req.params.studentId;
    const dissertationId = req.params.dissertationId;

    try {
        // Kiểm tra xem sinh viên và đề tài có tồn tại không
        const student = await Student.findById(studentId);
        const dissertation = await Dissertation.findById(dissertationId);

        if (!student || !dissertation) {
            return res.status(404).json({ error: 'Sinh viên hoặc đề tài không tồn tại.' });
        }

        // Kiểm tra xem sinh viên đã đăng ký đề tài này chưa
        if (student.registeredDissertations.includes(dissertationId)) {
            return res.status(400).json({ error: 'Sinh viên đã đăng ký đề tài này.' });
        }

        // Đăng ký đề tài cho sinh viên
        student.registeredDissertations.push(dissertationId);
        await student.save();

        // Thêm sinh viên vào danh sách sinh viên đã đăng ký của đề tài
        dissertation.registeredStudents.push(studentId);
        await dissertation.save();

        res.status(200).json({ success: 'Đăng ký đề tài thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
    }                                                                                       
    },
    
    
    
};

module.exports = studentController;
