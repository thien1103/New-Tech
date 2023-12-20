const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/getProfileStudents/:studentId', studentController.getProfileStudents);

router.put('/edit-profile/:studentId', studentController.updateProfileStudent);

router.get('/students/:studentId/registered-dissertations', studentController.getRegisteredDissertations);

router.post('/students/:studentId/dissertations/:dissertationId/register', studentController.registerDissertation);

module.exports = router;
