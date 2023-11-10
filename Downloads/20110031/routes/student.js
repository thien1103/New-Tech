const express = require('express');

const router = express.Router();
const studentController = require('../controllers/StudentController')

router.use((req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${method}] ${url}`);

    next();
});
router.get('/', studentController.show);

module.exports = router;