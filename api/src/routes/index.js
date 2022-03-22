const router = require('express').Router();

const { courseRouter } = require('./course');
const { userRouter } = require('./user');

router.use('/user', userRouter);
router.use('/course', courseRouter);

module.exports.routes = router;