const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifySignUp = require('../middleware/verifySignUp');


// Login route
router.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted], authController.signup);
router.post('/signin', authController.signin);

module.exports = router;