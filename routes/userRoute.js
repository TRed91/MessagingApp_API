const { Router } = require('express');
const controller = require('../controllers/userController');
const msgController = require('../controllers/messageController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/:userId', controller.userGet);
router.post('/', controller.userCreate);
router.put('/:userId', authentication, controller.userUpdate);

module.exports = router;