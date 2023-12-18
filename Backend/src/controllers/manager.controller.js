const Manager = require('../models/manager.model');
const Student = require('../models/student.model');
const Instructor = require('../models/instructor.model');
const Dissertation = require('../models/dissertation.model');
const mongoose = require('mongoose');

const managerController = {

    getManagerById: async (req, res) => {
        try {
            const manager = await Manager.findById(req.params.id);
            if (!manager) {
                return res.status(404).json({ message: 'Không tìm thấy quản lý' });
            }
            return res.status(200).json(manager);
        } catch (error) {
            console.error('Lỗi lấy thông tin quản lý:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    },

    createManager: async (req, res) => {
        try {
            const newManager = await Manager.create(req.body);
            const saveManager = await newManager.save();
            return res.status(201).json(newManager);
        } catch (error) {
            console.error('Lỗi tạo mới quản lý:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    },

      updateManager: async (req, res) => {
          try {
            const updatedManager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedManager) {
                return res.status(404).json({ message: 'Không tìm thấy quản lý' });
            }
            return res.status(200).json(updatedManager);
        } catch (error) {
            console.error('Lỗi cập nhật thông tin quản lý:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    },

    deleteManager: async (req, res) => {
        try {
            const deletedManager = await Manager.findByIdAndDelete(req.params.id);
            if (!deletedManager) {
                return res.status(404).json({ message: 'Không tìm thấy quản lý' });
            }
            return res.status(200).json({ message: 'Xóa quản lý thành công' });
        } catch (error) {
            console.error('Lỗi xóa quản lý:', error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    },

    // funtion students
    getAllStudentbystcode: async (req, res) => {
      try {
        const StudentDetail = await Student.find({ _studentCode: req.params.studentCode });
        res.json({ StudentDetail });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error ~ getStudentDetail" });
      }
  },
  
    updateStudent : async (req, res) => {
      try {
        console.log(req.body);
        const { name, studentCode, email, gender, phone, department } = req.body; // Fix typo in department
        const updatedStudent = await Student.findByIdAndUpdate(
          { _id: req.params.id },
          { name, studentCode, email, gender, phone, department } // Fix typo in department
        );
        if (updatedStudent) {
          res.json({ message: "Update successfully" });
        } else {
          res.json({ message: "Update fail" });
        }
      } catch (error) {
        res.status(500).json({ message: "Server error ~ updateStudent" });
      }
    },
    
    
    createStudent: async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
          const {
              studentID,
              name,
              studentCode,
              birthday,
              gender,
              email,
              phone,
              classs,
              departemt,
          } = req.body;
  
          // Tìm kiếm sinh viên theo studentCode
          const existingStudent = await Student.findOne({ studentCode });
  
          // Kiểm tra xem sinh viên đã tồn tại hay chưa
          if (existingStudent) {
              throw new Error("Sinh viên đã tồn tại!");
          }
  
          // Tạo một đối tượng Student mới
          const newStudent = new Student({
              studentID,
              name,
              studentCode,
              birthday,
              email,
              gender,
              phone,
              departemt,
              classs,
          });
  
          // Lưu sinh viên mới vào cơ sở dữ liệu
          await newStudent.save();
  
          await session.commitTransaction();
          session.endSession();
  
          console.log("Sinh viên đã được tạo mới thành công");
          return res.status(201).json(newStudent);
      } catch (error) {
          await session.abortTransaction();
          session.endSession();
  
          console.log(error);
          res.status(500).json({ message: error.message });
      }
  },
  
    
      deleteStudent: async (req, res) => {
        // const userID = req.params.id;
        try {
          const deletedStudent = await Student.findOneAndDelete({
            _id: req.params.id,
          });
          if (deletedStudent) {
            res.json({ success: true, message: "Deleted successfully!" });
          } else {
            res.status(404).json({ success: false, message: "Deleted fail!" });
          }
        } catch (error) {
          res.status(500).json({ message: "Server error ~ deleteStudent" });
        }
      },
      // funtion instructors
      getAllInstructors: async (req, res) => {
        try {
            const instructors = await Instructor.find();
            res.json({ instructors });
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).json({ success: false, message: 'Server error ~ getAllInstructors' });
        }
    },

    getInstructorById: async (req, res) => {
        try {
            const instructor = await Instructor.findById(req.params.id);
            if (!instructor) {
                return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
            }
            return res.status(200).json(instructor);
        } catch (error) {
            console.error('Lỗi lấy thông tin giảng viên:', error);
            return res.status(500).json({ message: 'Lỗi server ~ getInstructorById' });
        }
    },

    updateInstructor: async (req, res) => {
        try {
            const { name, gender, email, password, class: instructorClass, phone, isAccept, specialization } = req.body;
            const updatedInstructor = await Instructor.findByIdAndUpdate(
                { _id: req.params.id },
                { name, gender, email, password, class: instructorClass, phone, isAccept, specialization }
            );
            if (updatedInstructor) {
                res.json({ message: 'Update successfully' });
            } else {
                res.json({ message: 'Update fail' });
            }
        } catch (error) {
            console.error('Error in updateInstructor:', error);
            res.status(500).json({ message: 'Server error ~ updateInstructor' });
        }
    },

    createInstructor: async (req, res) => {
        try {
            const { instructorID, name, gender, email, password, class: instructorClass, phone, isAccept, specialization } = req.body;

            const isExist = await Instructor.findOne({ instructorID });
            if (isExist) {
                return res.status(400).json({ success: false, message: 'Instructor already exists!' });
            }

            const newInstructor = new Instructor({
                instructorID,
                name,
                gender,
                email,
                password,
                phone,
                isAccept,
                specialization,
            });

            await newInstructor.save();
            console.log('Create successfully');
            return res.status(201).json(newInstructor);
        } catch (error) {
            console.error('Error in createInstructor:', error);
            res.status(500).json({ message: 'Server error ~ createInstructor' });
        }
    },

    deleteInstructor: async (req, res) => {
        try {
            const deletedInstructor = await Instructor.findOneAndDelete({ _id: req.params.id });
            if (deletedInstructor) {
                res.json({ success: true, message: 'Deleted successfully!' });
            } else {
                res.status(404).json({ success: false, message: 'Deleted fail!' });
            }
        } catch (error) {
            console.error('Error in deleteInstructor:', error);
            res.status(500).json({ message: 'Server error ~ deleteInstructor' });
        }
    },

    // manager dissẻtation
    createDissertation: async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
          const {
              dissertationID,
              Name,
              Description,
              StudentID,
              InstructorID,
              CouncilID,
              Duration,
              // Thêm các trường khác tương ứng với schema của bạn
          } = req.body;
  
          // Tìm kiếm đề tài theo dissertationID
          const existingDissertation = await Dissertation.findOne({ dissertationID });
  
          // Kiểm tra xem đề tài đã tồn tại hay chưa
          if (existingDissertation) {
              throw new Error("Đề tài đã tồn tại!");
          }
  
          // Tạo một đối tượng Dissertation mới
          const newDissertation = new Dissertation({
              dissertationID,
              Name,
              Description,
              StudentID,
              InstructorID,
              CouncilID,
              Duration,
              // Thêm các trường khác tương ứng với schema của bạn
          });
  
          // Lưu đề tài mới vào cơ sở dữ liệu
          await newDissertation.save();
  
          await session.commitTransaction();
          session.endSession();
  
          console.log("Đề tài đã được tạo mới thành công");
          return res.status(201).json(newDissertation);
      } catch (error) {
          await session.abortTransaction();
          session.endSession();
  
          console.log(error);
          res.status(500).json({ message: error.message });
      }
  },
  
  

  updateDissertation : async (req, res) => {
    try {
        const dissertationID = req.params.dissertationID; // Lấy dissertationID từ URL
        const updateData = req.body;

        // Kiểm tra xem đề tài có tồn tại không
        const existingDissertation = await Dissertation.findById(dissertationID);

        if (!existingDissertation) {
            return res.status(404).json({ error: 'Đề tài không tồn tại.' });
        }

        // Cập nhật thông tin đề tài
        Object.assign(existingDissertation, updateData);
        await existingDissertation.save();

        res.status(200).json(existingDissertation);
    } catch (error) {
        console.error('Lỗi khi cập nhật đề tài:', error);
        res.status(500).json({ message: 'Lỗi máy chủ ~ updateDissertation' });
    }
},
deleteDissertation : async (req, res) => {
  try {
    const deletedDissertation = await Dissertation.findOneAndDelete({ _id: req.params.dissertationID });
    if (deletedDissertation) {
        res.json({ success: true, message: 'Deleted successfully!' });
    } else {
        res.status(404).json({ success: false, message: 'Deleted fail! Dissertation not found.' });
    }
} catch (error) {
    console.error('Error in deleteDissertation:', error);
    res.status(500).json({ message: 'Server error ~ deleteDissertation' });
}
}

};






module.exports = managerController;
