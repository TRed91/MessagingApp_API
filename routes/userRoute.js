const { Router } = require('express');
const controller = require('../controllers/userController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/:userId', controller.userGet);
router.post('/', controller.userCreate);
router.put('/:userId', controller.userUpdate);

module.exports = router;