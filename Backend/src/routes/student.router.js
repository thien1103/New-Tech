const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

//Show thông tin student
router.get('/students/:studentID', studentController.getProfileStudents);
//Edit profile
router.put('/editprofile/:studentID', studentController.updateProfileStudent);
//Xem đề tài chưa đăng kí
router.get('/student/available-dissertations',studentController.availabledissertations);
//Xem đề tài mà sinh viên đã đăng kí
router.get('/students/:studentId/registered-dissertations', studentController.getRegisteredDissertations);
//Đăng kí đề tài
router.post('/students/:studentId/dissertations/:dissertationId/register', studentController.registerDissertation);

//Quản lý đề tài
// 1.Xem yêu cầu của sinh viên
router.get('/students/:studentId/requests', studentController.viewRequestsForStudent);
// 2.Cập nhật tiến độ của sinh viên
router.put('/students/:guidanceId/update-progress', studentController.updateProgressForStudent);
// 3.Upload tài liệu của sinh viên
router.put('/students/upload-document/:guidanceId', studentController.uploadDocumentForStudent);
// Get Dissertation Name By ID
router.get('/getDissertationNameById/:dissertationId', studentController.getDissertationNameById);
// Get Instructor Name By ID
router.get('/getInstructorNameById/:instructorId', studentController.getInstructorNameById);




module.exports = router;
