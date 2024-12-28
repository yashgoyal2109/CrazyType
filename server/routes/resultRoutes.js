const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const auth = require('../middleware/auth');

router.post('/submit', auth, resultController.submitResult);
router.get('/history', auth, resultController.getResults);

module.exports = router;
