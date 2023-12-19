const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor.controller');


router.get('/get-instructor/:instructorId', instructorController.getProfileInstructor);
router.put('/update-instructor/:instructorId', instructorController.updateProfileInstructor);

// Xem danh sách đề tài mà sinh viên đã đăng ký để hướng dẫn
router.get('/instructor/guidance-dissertations/available', instructorController.viewRegisteredStudents);

// Đăng ký hướng dẫn đề tài cho sinh viên
router.post('/register-guidance/:instructorId/:studentId/:dissertationId', instructorController.registerToGuideDissertation);

// TBM
router.post('/heads-of-department/confirm-dissertation/:guidanceID', instructorController.TBMconfirmdissertation);
// giáo viên xác nhận hướng dân đề tài
router.post('/instructors/process-dissertation/:guidanceId', instructorController.confirmdissertation);

module.exports = router;    
