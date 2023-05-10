const express = require('express');
const path = require('path');
const router = express.Router();

const jobsRouter = require('../routes/jobsRoute.js');
const usersRouter = require('../routes/userRoute.js');

router.use('/jobs', jobsRouter);
router.use('/users', usersRouter);

module.exports = router;