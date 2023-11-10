const express = require('express');

const router = express.Router();
const mssvController = require('../controllers/MssvController');

router.use((req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${method}] ${url}`);

    next();
});
router.get('/:id', mssvController.showAllStudent);
router.post('/:id', mssvController.addStudent);

module.exports = router;