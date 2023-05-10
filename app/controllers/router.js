const express = require('express');
const path = require('path');
const router = express.Router();

const jobsRouter = require('../routes/jobsRoute.js');

router.use('/jobs', jobsRouter);

module.exports = router;