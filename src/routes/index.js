const express = require('express');
const router = express.Router();

const authRouter = require('./auth/authRouter');
const coursesRoute = require('./courses/coursesRouter');
const rolesRouter = require('./roles/rolesRouter');
const usersRouter = require('./users/usersRouter');
const teachersRouter = require('./users/teachersRouter');
const coursesStatusRouter = require('./courses/coursesStatusRouter');

router.use('/auth', authRouter);
router.use('/courses/status', coursesStatusRouter);
router.use('/courses', coursesRoute);
router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/teachers', teachersRouter);

module.exports = router;
