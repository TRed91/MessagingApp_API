const { Router } = require('express');
const controller = require('../controllers/loginController');
const router = Router();

router.post('/', controller.loginPost);

module.exports = router;