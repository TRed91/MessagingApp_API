const { Router } = require('express');
const controller = require('../controllers/messageController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/recent/:userId', controller.getRecentMessages);
router.get('/:authorId/private/:receiverName', authentication, controller.getPrivateChats);
router.get('/group/groupId', controller.getGroupMessages);
router.post('/:userId', controller.createMessage);

module.exports = router;