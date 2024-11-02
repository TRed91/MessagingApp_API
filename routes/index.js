const { Router } = require('express');
const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');

const router = Router();

router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/user', userRoute);

module.exports = router;