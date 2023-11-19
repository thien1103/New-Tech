const express = require('express');
const router = express.Router();
const managercontroller = require('../controllers/manager.controller');



router.get('/getManagers/:id', managercontroller.getManagerById);


router.post('/', managercontroller.createManager);


router.put('/:id', managercontroller.updateManager);


router.delete('/:id', managercontroller.deleteManager);

router.get('/getstudents/:stc', managercontroller.getAllStudentbystcode)

router.post("/poststudents/create", managercontroller.createStudent);

router.put("/putstudents/update/:id", managercontroller.updateStudent);

router.delete("/deletestudents/delete/:id", managercontroller.deleteStudent);

router.get('/getinstructors', managercontroller.getAllInstructors);

router.get('/getinstructors/:id', managercontroller.getInstructorById);

router.post('/postinstructors/create', managercontroller.createInstructor);

router.put('/putinstructors/update/:id', managercontroller.updateInstructor);

router.delete("/deleteInstructor/delete/:id", managercontroller.deleteInstructor);

router.post("/postDissertation/create", managercontroller.createDissertation);

router.put('/update-dissertation/:dissertationID', managercontroller.updateDissertation);

router.delete('/delete-dissertation/:dissertationID', managercontroller.deleteDissertation);

module.exports = router;
