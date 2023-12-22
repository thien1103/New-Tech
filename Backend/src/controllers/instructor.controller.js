const mongoose = require('mongoose');
const Instructor = require('../models/instructor.model');
const Guidance = require('../models/guidance.model');
const Dissertation = require('../models/dissertation.model');
const Student = require('../models/student.model');
const RegistrationPeriod = require('../models/registrationPeriod.model'); //
const Specialization = require('../models/specialization.model'); // Replace with the actual model for Specialization


const instructorController = {
      getAllInstructors: async (req, res) => {
        try {
            const instructors = await Instructor.find();
            res.json({ success: true, instructors });
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ getAllInstructors' });
        }
    },


    getSpecializationNameById: async (req, res) => {
        try {
          const specializationId = req.params.specializationId;
    
          // Use Mongoose to find specialization by ID
          const specialization = await Specialization.findById(specializationId);
    
          if (!specialization) {
            return res.status(404).json({ error: 'Specialization not found' });
          }
    
          // Return specialization name
          res.json({ specializationName: specialization.name });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    getProfileInstructor: async (req, res) => {
        try {
            const instructorID = req.params.instructorID;
            
            // Sử dụng Mongoose để tìm instructor theo instructorID
            const instructor = await Instructor.findOne({ instructorID });
        
            if (!instructor) {
              return res.status(404).json({ error: 'Instructor not found' });
            }
        
            // Trả về thông tin hồ sơ instructor nếu tìm thấy
            res.json({ instructor });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },
    updateProfileInstructor: async (req, res) => {
        const { instructorID } = req.params; // Đây là ID của instructor cần cập nhật
        const updatedProfile = req.body; // Dữ liệu cập nhật từ người dùng

        try {
            // Tìm instructor theo ID
            const instructor = await Instructor.findOne({ instructorID });

            if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
            }

            // Cập nhật thông tin hồ sơ
            Object.assign(instructor, updatedProfile);

            // Lưu thông tin cập nhật vào database
            await instructor.save();

            return res.status(200).json({ message: 'Profile updated successfully', instructor });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
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

          const specializationIds = req.body.specializationIds;
      
          const instructor = await Instructor.findById(instructorId);
          if (!instructor) {
            return res.status(404).json({ error: 'Giáo viên không tồn tại.' });
          }
      

      
          const dissertation = new Dissertation({
            ...dissertationData,
            InstructorID: instructorId,

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
    approveDissertation: async (req, res) => {
      const { decision } = req.body; // decision can be 'accept' or 'reject'
    
      try {
        const dissertation = await Dissertation.findById(req.params.dissertationId);
    
        if (!dissertation) {
          return res.status(404).json({ message: 'Đề tài không tồn tại.' });
        }
    
        // Update dissertation status based on the decision
        if (decision === 'accept') {
          dissertation.Status = 'Accepted';
        } else if (decision === 'reject') {
          dissertation.Status = 'Rejected';
        } else {
          return res.status(400).json({ message: 'Decision không hợp lệ.' });
        }
  
    
        await dissertation.save();
    
        // Update the corresponding Guidance record
        const guidance = await Guidance.findOne({ dissertation: req.params.dissertationId });
    
        if (!guidance) {
          return res.status(404).json({ message: 'Hướng dẫn không tồn tại.' });
        }
    
        if (decision === 'accept') {
          guidance.status = 'Accepted';
        } else if (decision === 'reject') {
          guidance.status = 'Rejected';
        } else {
          return res.status(400).json({ message: 'Decision không hợp lệ.' });
        }
        await guidance.save();
    
        return res.status(200).json({ message: 'thành công' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý.' });
      }
    },

    
    //Phân giáo viên phản biện
    assignreviewer: async (req, res) => {
        try {
            const { dissertationId, instructorIds } = req.params;
        
            const dissertation = await Dissertation.findById(dissertationId);
        
            if (!dissertation) {
              return res.status(404).json({ message: 'Không tìm thấy đề tài.' });
            }
        
            const maxReviewers = 3;
            const instructorsToAdd = JSON.parse(instructorIds).slice(0, maxReviewers);
        
            instructorsToAdd.forEach(instructorId => {
              dissertation.defenseReview.push({
                assignedInstructorID: instructorId,
                comments: '',
              });
            });
        
            await dissertation.save();
        
            return res.status(200).json({ message: 'Phân giáo viên phản biện thành công.' });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi.' });
          }
      },
      //Instructor giao task
      createTaskForStudent : async (req, res) => {
        try {
            const { instructorId, studentId, dissertationId } = req.params;
            const { title, description, deadline, instructionsFile } = req.body;
    
            // Kiểm tra xem đã có hướng dẫn cho đối tượng này chưa
            let guidance = await Guidance.findOne({
                instructor: instructorId,
                student: studentId,
                dissertation: dissertationId,
            });
    
            // Nếu chưa có, tạo mới
            if (!guidance) {
                guidance = await Guidance.create({
                    instructor: instructorId,
                    student: studentId,
                    dissertation: dissertationId,
                });
            }
    
            // Thêm task vào đối tượng Guidance
            guidance.task = {
                title,
                description,
                deadline,
                instructionsFile,
            };
    
            await guidance.save();
    
            res.status(201).json(guidance);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating task for student.' });
        }
    }
      
};


module.exports = instructorController;
