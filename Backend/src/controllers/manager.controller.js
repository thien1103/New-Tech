const Manager = require('../models/manager.model');
const Student = require('../models/student.model');
const Instructor = require('../models/instructor.model');
const Dissertation = require('../models/dissertation.model');
const mongoose = require('mongoose');
const Specialization = require('../models/specialization.model');
const RegistrationPeriod = require('../models/registrationPeriod.model');

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
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.json({ success: true, students });
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ getAllstudents' });
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
        try {

            const { studentID, studentCode,name, email,birthday, password, phone, classs } = req.body;
        
     
           // Check if the student exists
            const existingStudent = await Student.findOne({ studentID: studentID });
            if (existingStudent) {
            return res.status(400).json({ success: false, message: 'Student already exists' });
            }
        
            // Create a new instructor with the specialization
            const newStudent = new Student({
                studentID, studentCode,name, email,birthday, password, phone, classs
            });
        
            await newStudent.save();
            console.log('Created successfully');
            res.status(201).json({ success: true, newStudent });
          } catch (error) {
            console.error('Error in creating Student:', error);
            res.status(500).json({ success: false, message: 'Server error ~ createStudent' });
  
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
            res.json({ success: true, instructors });
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ getAllInstructors' });
        }
    },

    getInstructorById: async (req, res) => {
        try {
            const instructor = await Instructor.findById(req.params.id);
            if (instructor) {
                res.json({ success: true, instructor });
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên!' });
            }
        } catch (error) {
            console.error('Error in getting Instructor information:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ getInstructorById' });
        }
    },

    updateInstructor: async (req, res) => {
        try {
            const { name, gender, email, password, phone, isAccept, specializationId } = req.body;
    
            // Kiểm tra xem giáo viên có tồn tại không
            const existingInstructor = await Instructor.findById(req.params.id);
            if (!existingInstructor) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên!' });
            }
    
            // Cập nhật thông tin giáo viên, bao gồm cả chuyên ngành
            const updatedInstructor = await Instructor.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    gender,
                    email,
                    password,
                    phone,
                    isAccept,
                    specialization: specializationId,
                },
                { new: true }
            );
    
            if (updatedInstructor) {
                res.json({ success: true, message: 'Cập nhật thông tin giáo viên thành công', updatedInstructor });
            } else {
                res.json({ success: false, message: 'Cập nhật thông tin giáo viên thất bại' });
            }
        } catch (error) {
            console.error('Error in updating Instructor:', error);
            res.status(500).json({ success: false, message: 'Server error ~ updateInstructor' });
        }
    },

    createInstructor: async (req, res) => {
        try {

          const { instructorID, name, email, password, phone, specializationId } = req.body;
      
          // Check if the specialization exists
          const specialization = await Specialization.findById(specializationId);
          if (!specialization) {
            return res.status(400).json({ success: false, message: 'Chuyên ngành không tồn tại!' });
          }
      
          // Create a new instructor with the specialization
          const newInstructor = new Instructor({
            instructorID,
            name,
            email,
            password,
            phone,
            specialization: specializationId,
          });
      
          await newInstructor.save();
          console.log('Created successfully');
          res.status(201).json({ success: true, newInstructor });
        } catch (error) {
          console.error('Error in creating Instructor:', error);
          res.status(500).json({ success: false, message: 'Server error ~ createInstructor' });

        }
    },

    deleteInstructor: async (req, res) => {
        try {
            const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
            if (deletedInstructor) {
                res.json({ success: true, message: 'Xóa giáo viên thành công!' });
            } else {
                res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên để xóa!' });
            }
        } catch (error) {
            console.error('Error in deleting Instructor:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ deleteInstructor' });
        }
    },

    // manager dissertation//
    getAlldissertations: async (req, res) => {
        try {
            const dissertation = await Dissertation.find();
            res.json({ success: true, dissertation });
        } catch (error) {
            console.error('Error fetching dissertation:', error);
            res.status(500).json({ success: false, message: 'Lỗi server ~ getAllstudents' });
        }
    },
    createDissertation: async (req, res) => {
        try {

            const { Name, Description,dissertationID, instructorId, specializationId  } = req.body;

    
            // Kiểm tra xem giáo viên, chuyên ngành và kì đăng ký có tồn tại không
            const instructor = await Instructor.findById(instructorId);
            const specialization = await Specialization.findById(specializationId);

            
    
            if (!instructor || !specialization ) {

                return res.status(400).json({ success: false, message: 'Giáo viên, chuyên ngành hoặc kì đăng ký không tồn tại!' });
            }
    
            // Tạo đề tài mới và lưu vào database
            const newDissertation = new Dissertation({
                Name,
                Description,
                dissertationID,
                InstructorID: instructorId,
                specializationID: specializationId,

            });
    
            await newDissertation.save();
            return res.status(201).json({ success: true, newDissertation });
        } catch (error) {
            console.error('Error creating dissertation:', error);
            return res.status(500).json({ success: false, message: 'Server error ~ createDissertation' });
        }
    },
        updateDissertation : async (req, res) => {
            try {
                const { Name, Description, dissertationID, instructorId, specializationId, registrationPeriodId } = req.body;
                const dissertationId = req.params.id;
        
                // Kiểm tra xem đề tài có tồn tại không
                console.log(dissertationId)
                const dissertation = await Dissertation.findById(dissertationId);
                
                if (!dissertation) {


                    return res.status(404).json({ error: 'Đề tài không tồn tại' });
                }
        
                // Cập nhật thông tin đề tài
                const updatedDissertation = await Dissertation.findByIdAndUpdate(
                    req.params.id,
                    {
                        Name,
                        Description,
                        dissertationID,
                        InstructorID: instructorId,
                        specializationID: specializationId,
                        RegistrationPeriodID: registrationPeriodId,
                    },
                    { new: true }
                );
        
                return res.json({ success: true, message: 'Cập nhật đề tài thành công', updatedDissertation });
            } catch (error) {
                console.error('Error updating dissertation:', error);
                return res.status(500).json({ success: false, message: 'Server error ~ updateDissertation' });
            }
        },
        deleteDissertation : async (req, res) => {
            try {
                const deletedDissertation = await Dissertation.findByIdAndDelete(req.params.id);
                if (deletedDissertation) {
                    res.json({ success: true, message: 'Xóa đề tài thành công!' });
                } else {
                    res.status(404).json({ success: false, message: 'Không tìm thấy đề tài để xóa!' });
                }
            } catch (error) {
                console.error('Error in deleting Dissertation:', error);
                res.status(500).json({ success: false, message: 'Lỗi server ~ deleteDissertation' });
            }
        },


        //Quản lý chuyên ngành

        getAllSpecialization: async (req, res) => {
            try {
                const specialization = await Specialization.find();
                res.json({ success: true, specialization });
            } catch (error) {
                console.error('Error fetching specialization:', error);
                res.status(500).json({ success: false, message: 'Lỗi server ~ getAllSpecialization' });
            }
        },
    

        addnewspecialization: async (req, res) => {
            try {
                const { name, description } = req.body;
        
                // Kiểm tra xem chuyên ngành có tồn tại chưa
                const existingSpecialization = await Specialization.findOne({ name });
                if (existingSpecialization) {
                    return res.status(400).json({ error: 'Chuyên ngành đã tồn tại.' });
                }
        
                // Tạo chuyên ngành mới
                const newSpecialization = new Specialization({ name, description });
                await newSpecialization.save();
        
                return res.status(201).json({ success: 'Chuyên ngành đã được thêm thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        
        },

        editspecialization: async (req, res) => {
            try {
                const specializationId = req.params.id;
                const { name, description } = req.body;
        
                // Kiểm tra xem chuyên ngành có tồn tại chưa
                const specialization = await Specialization.findById(specializationId);
                if (!specialization) {
                    return res.status(404).json({ error: 'Chuyên ngành không tồn tại.' });
                }
        
                // Kiểm tra xem có chuyên ngành khác có cùng tên không (trừ chính nó)
                const existingSpecialization = await Specialization.findOne({ name, _id: { $ne: specializationId } });
                if (existingSpecialization) {
                    return res.status(400).json({ error: 'Chuyên ngành đã tồn tại.' });
                }
        
                // Cập nhật thông tin chuyên ngành
                specialization.name = name;
                specialization.description = description;
        
                await specialization.save();
        
                return res.status(200).json({ success: 'Chuyên ngành đã được cập nhật thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },
        deletespecialization: async (req, res) => {
            try {
                const specializationId = req.params.id;
        
                // Kiểm tra xem chuyên ngành có tồn tại chưa
                const specialization = await Specialization.findById(specializationId);
                if (!specialization) {
                    return res.status(404).json({ error: 'Chuyên ngành không tồn tại.' });
                }
        
                // Xóa chuyên ngành
                await specialization.deleteOne();
        
                return res.status(200).json({ success: 'Chuyên ngành đã được xóa thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },
        getspecialization: async (req, res) => {
            try {
                const specializationId = req.params.id;
        
                // Kiểm tra xem chuyên ngành có tồn tại chưa
                const specialization = await Specialization.findById(specializationId);
                if (!specialization) {S
                    return res.status(404).json({ error: 'Chuyên ngành không tồn tại.' });
                }
        
                // Trả về thông tin chuyên ngành
                return res.status(200).json({ specialization });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },

        //Quản lý đợt đăng kí đề tài
        getallregistrationperiod: async (req, res) => {
            try {
                const registrationPeriods = await RegistrationPeriod.find();
                return res.status(200).json({ registrationPeriods });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },

        
        addregistrationperiod: async (req, res) => {
            try {
                const { name, startDate, endDate, semesterNumber } = req.body;
        
                // Tạo đợt đăng ký đề tài mới
                const newRegistrationPeriod = new RegistrationPeriod({ name, startDate, endDate, semesterNumber });
                await newRegistrationPeriod.save();
        
                return res.status(201).json({ success: 'Đợt đăng ký đề tài mới đã được thêm thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },

        editregistrationperiod: async (req, res) => {
            try {
                const { name, startDate, endDate, semesterNumber } = req.body;
                const registrationPeriodId = req.params.id;
        
                // Tìm đợt đăng ký đề tài theo ID
                const registrationPeriod = await RegistrationPeriod.findById(registrationPeriodId);
        
                // Kiểm tra xem đợt đăng ký đề tài có tồn tại không
                if (!registrationPeriod) {
                    return res.status(404).json({ error: 'Đợt đăng ký đề tài không tồn tại.' });
                }
        
                // Cập nhật thông tin đợt đăng ký đề tài
                registrationPeriod.name = name;
                registrationPeriod.startDate = startDate;
                registrationPeriod.endDate = endDate;
                registrationPeriod.semesterNumber = semesterNumber;
        
                // Lưu thay đổi vào cơ sở dữ liệu
                await registrationPeriod.save();
        
                return res.status(200).json({ success: 'Thông tin đợt đăng ký đề tài đã được cập nhật thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },

        
        deleteregistrationperiod:async (req, res) => {
            try {
                const registrationPeriodId = req.params.id;
        
                // Tìm đợt đăng ký đề tài theo ID
                const registrationPeriod = await RegistrationPeriod.findById(registrationPeriodId);
        
                // Kiểm tra xem đợt đăng ký đề tài có tồn tại không
                if (!registrationPeriod) {
                    return res.status(404).json({ error: 'Đợt đăng ký đề tài không tồn tại.' });
                }
                // Xóa đợt đăng ký đề tài
                await registrationPeriod.deleteOne();
        
                return res.status(200).json({ success: 'Đợt đăng ký đề tài đã được xóa thành công.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
            }
        },
};



module.exports = managerController;
