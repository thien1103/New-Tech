const mongoose = require('mongoose');
const Instructor = require('../models/instructor.model');
const Guidance = require('../models/guidance.model');
const Dissertation = require('../models/dissertation.model');
const Student = require('../models/student.model');

const instructorController = {
    getProfileInstructor: async (req, res) => {
        const instructorId = req.params.instructorId;

        try {
            // Check if the instructor exists
            const instructor = await Instructor.findById(instructorId);

            if (!instructor) {
                return res.status(404).json({ error: 'Giảng viên không tồn tại.' });
            }

            res.status(200).json(instructor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },

    updateProfileInstructor: async (req, res) => {
        const instructorId = req.params.instructorId;
        const { phone, email } = req.body;
    
        try {
            // Check if the instructor exists
            const instructor = await Instructor.findById(instructorId);
    
            if (!instructor) {
                return res.status(404).json({ error: 'Giảng viên không tồn tại.' });
            }
    
            // Update personal information
            if (phone) instructor.phone = phone;
            if (email) instructor.email = email;
    
            // Save changes to the database
            await instructor.save();
    
            // Log the updated instructor object for debugging
            console.log('Updated Instructor:', instructor);
    
            res.status(200).json({ success: 'Cập nhật thông tin cá nhân thành công.' });
        } catch (error) {
            console.error('Error updating instructor:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },
    
    

    // Đăng ký hướng dẫn đề tài cho sinh viên
    registerToGuideDissertation: async (req, res) => {
        const instructorId = req.params.instructorId;
        const studentId = req.params.studentId;
        const dissertationId = req.params.dissertationId;

        try {
            // Kiểm tra xem giảng viên, sinh viên và đề tài có tồn tại không
            const instructor = await Instructor.findById(instructorId);
            const student = await Student.findById(studentId);
            const dissertation = await Dissertation.findById(dissertationId);

            if (!instructor || !student || !dissertation) {
                return res.status(404).json({ error: 'Giảng viên, sinh viên hoặc đề tài không tồn tại.' });
            }

            // Kiểm tra xem đã tồn tại mối quan hệ hướng dẫn này chưa
            const existingGuidance = await Guidance.findOne({ instructor: instructorId, student: studentId, dissertation: dissertationId });

            if (existingGuidance) {
                return res.status(400).json({ error: 'Mối quan hệ hướng dẫn đã tồn tại.' });
            }

            // Tạo mối quan hệ hướng dẫn mới
            const guidance = new Guidance({
                instructor: instructorId,
                student: studentId,
                dissertation: dissertationId,
                // Các trường khác nếu cần thiết
                // ...
            });

            await guidance.save();

            res.status(200).json({ success: 'Đăng ký hướng dẫn đề tài thành công.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },

    viewRegisteredStudents: async (req, res) => {
        try {
            // Lấy danh sách các đăng ký trước từ Guidance
            const registeredDissertations = await Guidance.find({})
              .populate('student', 'name') // Populate thông tin sinh viên (lấy chỉ tên để ví dụ)
              .populate('dissertation', 'Name'); // Populate thông tin về đề tài (lấy chỉ tên để ví dụ)
        
            res.json(registeredDissertations);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
          }
    },
    // Giáo viên xác nhận hướng dẫn đề tài
    confirmdissertation : async (req, res) => {
        const { decision } = req.body; // decision có thể là 'accept' hoặc 'reject'
    
        try {
            const guidance = await Guidance.findById(req.params.guidanceId);
    
            if (!guidance) {
                return res.status(404).json({ message: 'Hướng dẫn không tồn tại.' });
            }
    
            // Xác nhận hoặc từ chối đề tài
            if (decision === 'accept') {
                guidance.status = 'Accepted';
            } else if (decision === 'reject') {
                guidance.status = 'Rejected';
            } else {
                return res.status(400).json({ message: 'Decision không hợp lệ.' });
            }
    
            guidance.isConfirmed = true;
    
            await guidance.save();
    
            const confirmationMessage =
                decision === 'accept' ? 'Đề tài đã được xác nhận.' : 'Đề tài đã bị từ chối.';
    
            return res.status(200).json({ message: confirmationMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    },
    
    //Trưởng bộ môn xét duyệt
    TBMconfirmdissertation: async (req, res) => {
        const guidanceID = req.params.guidanceID;
        const isConfirmed = req.body.isConfirmed; // isConfirmed: true hoặc false

            try {
                // Lấy thông tin hướng dẫn
                const guidance = await Guidance.findById(guidanceID).populate('student').populate('instructor').populate('dissertation');
                if (!guidance) {
                    return res.status(404).json({ error: 'Không tìm thấy thông tin đăng ký.' });
                }

                // Kiểm tra xem đề tài đã được xác nhận hoặc từ chối trước đó
                if (guidance.isConfirmed) {
                    return res.status(400).json({ error: 'Đề tài này đã được xác nhận hoặc từ chối trước đó.' });
                }

                // Cập nhật trạng thái xác nhận của đề tài
                guidance.isConfirmed = isConfirmed;
                await guidance.save();

                // Cập nhật trạng thái 'status' trong đối tượng dissertation của hướng dẫn
                if (isConfirmed) {
                    guidance.dissertation.Status = 'Accepted';
                    await guidance.dissertation.save();
                }

                // Gửi thông báo sau khi xác nhận hoặc từ chối đề tài
                const confirmationMessage = 'Xác nhận đề tài thành công.';
                
                res.json({ success: true, message: confirmationMessage });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.', detail: error.message });
            }
    }   
};


module.exports = instructorController;
