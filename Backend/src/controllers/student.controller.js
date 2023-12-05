const Student = require('../models/student.model');
const Dissertation = require('../models/dissertation.model');
const Guidance = require('../models/guidance.model');


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

    getRegisteredDissertations: async (req, res) => {
        const studentId = req.params.studentId;

        try {
            // Kiểm tra xem sinh viên có tồn tại không
            const student = await Student.findById(studentId);

            if (!student) {
                return res.status(404).json({ error: 'Sinh viên không tồn tại.' });
            }

            // Lấy danh sách đề tài mà sinh viên đã đăng ký
            const registeredDissertations = await Guidance.find({
                student: studentId,
            }).populate('dissertation');

            res.status(200).json(registeredDissertations);
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
            const isRegistered = await Guidance.findOne({
                student: studentId,
                dissertation: dissertationId
            });

            if (isRegistered) {
                return res.status(400).json({ error: 'Sinh viên đã đăng ký đề tài này.' });
            }

            // Đăng ký đề tài cho sinh viên
            const guidance = new Guidance({
                student: studentId,
                dissertation: dissertationId,
            });

            await guidance.save();

            res.status(200).json({ success: 'Đăng ký đề tài thành công.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },
    
    
    
};

module.exports = studentController;
