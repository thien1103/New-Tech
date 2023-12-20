const Student = require('../models/student.model');
const Dissertation = require('../models/dissertation.model');
const Guidance = require('../models/guidance.model');
const multer = require('multer');
const path = require('path');


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
    //Xem tất cả các đề tài chưa đc đăng kí
    availabledissertations: async (req, res) => {
        try {
            // Find dissertations that are not yet registered by any student
            const availableDissertations = await Dissertation.find({ StudentID: { $exists: false } });
    
            if (availableDissertations.length === 0) {
                return res.status(404).json({ message: 'No available dissertations.' });
            }
    
            res.status(200).json(availableDissertations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving available dissertations.' });
        }
    },
    //Xem đề tài đã đăng kí
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
            student: student._id,
            instructor: dissertation.instructor,
            dissertation: dissertation._id,
            status: 'Pending',
            });

            await guidance.save();

            // Thêm hướng dẫn vào mảng registeredDissertations của sinh viên
            student.registeredDissertations.push({
            dissertation: guidance._id,
            status: 'Chờ xét duyệt',
            });

            await student.save();

            res.status(200).json({ success: 'Đăng ký đề tài thành công. Chờ xét duyệt' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },

    //Quản ly đề tài cảu student 
    // 1. Xem task instructor giao
    viewRequestsForStudent : async (req, res) => {
        try {
            const { studentId } = req.params;
            const requests = await Guidance.find({ student: studentId });
    
            res.status(200).json(requests);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error getting requests for student.' });
        }
    },
    //2. Update tiến độ
    updateProgressForStudent : async (req, res) => {
        try {
            const { guidanceId } = req.params;
            const { completion } = req.body;
    
            const guidance = await Guidance.findById(guidanceId);
    
            if (!guidance) {
                return res.status(404).json({ message: 'Không tìm thấy hướng dẫn.' });
            }
    
            guidance.task.completion = completion;
            await guidance.save();
    
            res.status(200).json(guidance);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating progress for student.' });
        }
    },
    //3. Upload tài liệu
    uploadDocumentForStudent : async (req, res) => {
        const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (!file) {
                alert('Please select a file.');
                return;
            }

            const formData = new FormData();
            formData.append('document', file);

            try {
                // Simulate the server-side processing
                await simulateServerProcessing(formData);
                
                console.log('Upload successful!');
            } catch (error) {
                console.error('Error uploading file:', error.message);
            }
    }
    
    
    
};

module.exports = studentController;
