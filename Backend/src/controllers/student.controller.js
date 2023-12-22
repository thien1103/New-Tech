const Student = require('../models/student.model');
const Dissertation = require('../models/dissertation.model');
const Guidance = require('../models/guidance.model');

const Instructor = require('../models/instructor.model');
const multer = require('multer');
const path = require('path');
const Specialization = require('../models/specialization.model');



const studentController = {



    getInstructorNameById: async (req, res) => {
        try {
          const instructorId = req.params.instructorId;
    
          // Use Mongoose to find specialization by ID
          const instructor = await Instructor.findById(instructorId);
    
          if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
          }
    
          // Return specialization name
          res.json({ instructorName: instructor.name });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

      getDissertationNameById: async (req, res) => {
        try {
          const dissertationId = req.params.dissertationId;
    
          // Use Mongoose to find specialization by ID
          const dissertation = await Instructor.findById(dissertationId);
    
          if (!dissertation) {
            return res.status(404).json({ error: 'Dissertation not found' });
          }
    
          // Return specialization name
          res.json({ dissertationName : dissertation.name });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },


    getProfileStudents : async (req, res) => {
        try {
            const studentID = req.params.studentID;
            
            // Sử dụng Mongoose để tìm instructor theo instructorID
            const student = await Student.findOne({ studentID });
        
            if (!student) {
              return res.status(404).json({ error: 'Instructor not found' });
            }
        
            // Trả về thông tin hồ sơ instructor nếu tìm thấy
            res.json({ student });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },
    updateProfileStudent: async (req, res) => {
        const studentID = req.params.studentID;
        const updateData = req.body; // Assuming the updated data is sent in the request body

        try {
            // Find the student by studentID
            const student = await Student.findOne({ studentID });

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            // Update the student's profile
            Object.assign(student, updateData);

            // Save the updated student document
            await student.save();

            res.status(200).json({ message: 'Profile updated successfully', updatedProfile: student });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
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
            const student = await Student.findById({ _id: studentId });
            const dissertation = await Dissertation.findById({ _id: dissertationId });
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
            instructor: dissertation.InstructorID,
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
