const express = require('express');

const router = express.Router();
const messageController = require('../controllers/MessageController');

router.use((req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${method}] ${url}`);

    next();
});
router.get('/:id', messageController.showMessID);
router.get('/', messageController.showMessNoID);

module.exports = router;