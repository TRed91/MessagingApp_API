const { Router } = require('express');
const controller = require('../controllers/messageController');
const router = Router();

router.get('/recent/:userId', controller.getRecentMessages);
router.get('/:authorId/private/:receiverName', controller.getPrivateChats);
router.get('/group/groupId', controller.getGroupMessages);
router.post('/:userId', controller.createMessage);

module.exports = router;