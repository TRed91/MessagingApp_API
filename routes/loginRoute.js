const { Router } = require('express');
const controller = require('../controllers/loginController');
const authentication = require('../authentication/authentication');
const router = Router();

router.post('/', controller.loginPost);
router.get('/', authentication, controller.checkToken);

module.exports = router;