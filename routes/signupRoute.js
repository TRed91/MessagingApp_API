const { Router } = require('express');
const controller = require('../controllers/signupController');
const router = Router();

router.post('/', controller.signupPost);

module.exports = router;