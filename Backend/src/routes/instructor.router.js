const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor.controller');


router.get('/get-instructor/:instructorId', instructorController.getProfileInstructor);
router.put('/update-instructor/:instructorId', instructorController.updateProfileInstructor);

// Xem danh sách đề tài mà sinh viên đã đăng ký để hướng dẫn
router.get('/instructor/guidance-dissertations/available', instructorController.viewRegisteredStudents);

// Đăng ký hướng dẫn đề tài cho sinh viên
router.post('/instructors/:instructorId/dissertations', instructorController.createDissertation);
//instructor giao task for student
router.post('/instructor/:instructorId/:studentId/:dissertationId/task', instructorController.createTaskForStudent);
// TBM
router.post('/department-heads/dissertations/:dissertationId', instructorController.approveDissertation);
// giáo viên xác nhận hướng dân đề tài
router.post('/instructors/process-dissertation/:guidanceId', instructorController.confirmdissertation);
//TBM
router.post('/assign-reviewers/:dissertationId/:instructorIds',instructorController.assignreviewer)

module.exports = router;    
