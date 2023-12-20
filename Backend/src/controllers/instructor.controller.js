const mongoose = require('mongoose');
const Instructor = require('../models/instructor.model');
const Guidance = require('../models/guidance.model');
const Dissertation = require('../models/dissertation.model');
const Student = require('../models/student.model');
const RegistrationPeriod = require('../models/registrationPeriod.model'); //


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

    createDissertation : async (req, res) => {
        try {
          const instructorId = req.params.instructorId;
          const dissertationData = req.body;
          const registrationPeriodId = req.body.registrationPeriodId;
          const specializationIds = req.body.specializationIds;
      
          const instructor = await Instructor.findById(instructorId);
          if (!instructor) {
            return res.status(404).json({ error: 'Giáo viên không tồn tại.' });
          }
      
          const registrationPeriod = await RegistrationPeriod.findById(registrationPeriodId);
          if (!registrationPeriod) {
            return res.status(404).json({ error: 'Đợt đăng ký không tồn tại.' });
          }
      
          const dissertation = new Dissertation({
            ...dissertationData,
            InstructorID: instructorId,
            RegistrationPeriodID: registrationPeriodId,
            specializationID: specializationIds,
            isInstructorAccept: true, // Giả sử giáo viên tự đăng ký đề tài và chấp nhận luôn
            Status: 'Pending', // Sửa lại thành 'PendingApproval' để chờ xét duyệt
          });
          await dissertation.save();
      
          res.status(201).json(dissertation);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
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
    approveDissertation : async (req, res) => {
        const { decision } = req.body; // decision có thể là 'accept' hoặc 'reject'
    
        try {
            const dissertation = await Dissertation.findById(req.params.dissertationId);
    
            if (!dissertation) {
                return res.status(404).json({ message: 'Đề tài không tồn tại.' });
            }
    
            // Xác nhận hoặc từ chối đề tài
            if (decision === 'accept') {
                dissertation.Status = 'Accepted';
            } else if (decision === 'reject') {
                dissertation.Status = 'Rejected';
            } else {
                return res.status(400).json({ message: 'Decision không hợp lệ.' });
            }
    
            dissertation.isConfirmed = true;
    
            await dissertation.save();
    
            const confirmationMessage =
                decision === 'accept' ? 'Đề tài đã được xác nhận.' : 'Đề tài đã bị từ chối.';
    
            return res.status(200).json({ message: confirmationMessage });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý.' });
        }
    }
};


module.exports = instructorController;
