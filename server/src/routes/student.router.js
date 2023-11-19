const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/getProfileStudents/:studentId', studentController.getProfileStudents);

router.put('/edit-profile/:studentId', studentController.updateProfileStudent);

router.get('/all-dissertations', studentController.getALLDissertation);

router.post('/register-dissertation/:studentId/:dissertationId', studentController.registerDissertation);

module.exports = router;
