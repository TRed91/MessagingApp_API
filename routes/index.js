const { Router } = require('express');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const messageRoute = require('./messageRoute');

const router = Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/message', messageRoute);

module.exports = router;