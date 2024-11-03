const { Router } = require('express');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const messageRoute = require('./messageRoute');
const unauthorizedRoute = require('./unauthorizedRoute');

const router = Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/message', messageRoute);
router.use('/unauthorized', unauthorizedRoute);

module.exports = router;