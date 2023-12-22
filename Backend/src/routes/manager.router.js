const express = require('express');
const router = express.Router();
const managercontroller = require('../controllers/manager.controller');



router.get('/getManagers/:id', managercontroller.getManagerById);


router.post('/', managercontroller.createManager);


router.put('/:id', managercontroller.updateManager);


router.delete('/:id', managercontroller.deleteManager);
//Quản lý student
router.get('/getallStudents', managercontroller.getAllStudents);
router.get('/getstudents/:stc', managercontroller.getAllStudentbystcode)
router.get('/getstudent/:id', managercontroller.getStudentById);
router.post("/poststudents/create", managercontroller.createStudent);
router.put("/putstudents/update/:id", managercontroller.updateStudent);
router.delete("/deletestudents/delete/:id", managercontroller.deleteStudent);


//Quản lý instructor

router.get('/getallinstructors', managercontroller.getAllInstructors);

router.get('/getinstructors/:id', managercontroller.getInstructorById);
router.post('/postinstructors/create', managercontroller.createInstructor);
router.put('/putinstructors/update/:id', managercontroller.updateInstructor);
router.delete("/deleteInstructor/delete/:instructorID", managercontroller.deleteInstructor);
//Quản lý đề tài
router.get('/getInstructorNameById/:instructorId', managercontroller.getInstructorNameById);
router.get('/getalldissertations', managercontroller.getAlldissertations);
router.post("/postDissertation/create", managercontroller.createDissertation);
router.put('/update-dissertation/:id', managercontroller.updateDissertation);
router.delete('/delete-dissertation/:id', managercontroller.deleteDissertation);
///Quản lý chuyên ngành
router.post('/add-specialization',managercontroller.addnewspecialization);
router.put('/edit-specialization/:id',managercontroller.editspecialization);
router.delete('/delete-specialization/:id',managercontroller.deletespecialization);
router.get('/specialization/:id',managercontroller.getspecialization);
router.get('/getAllSpecializations/',managercontroller.getAllSpecialization);


//Quản lý đơt đăng kí đê tài
router.post('/add-registration-period',managercontroller.addregistrationperiod);
router.put('/edit-registration-period/:id',managercontroller.editregistrationperiod);
router.delete('/delete-registration-period/:id',managercontroller.deleteregistrationperiod);
router.get('/all-registration-periods',managercontroller.getallregistrationperiod);
module.exports = router;
