const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

//Show thông tin student
router.get('/getProfileStudents/:studentId', studentController.getProfileStudents);
//Edit profile
router.put('/edit-profile/:studentId', studentController.updateProfileStudent);
//Xem đề tài chưa đăng kí
router.get('/student/available-dissertations',studentController.availabledissertations);
//Xem đề tài mà sinh viên đã đăng kí
router.get('/students/:studentId/registered-dissertations', studentController.getRegisteredDissertations);
//Đăng kí đề tài
router.post('/students/:studentId/dissertations/:dissertationId/register', studentController.registerDissertation);

//Quản lý đề tài
// 1.Xem yêu cầu của sinh viên
router.get('/student/:studentId/requests', studentController.viewRequestsForStudent);
// 2.Cập nhật tiến độ của sinh viên
router.put('/student/:guidanceId/update-progress', studentController.updateProgressForStudent);
// 3.Upload tài liệu của sinh viên
router.put('/students/upload-document/:guidanceId', studentController.uploadDocumentForStudent);


module.exports = router;
