const express = require('express');
const path = require('path');
const router = express.Router();

const jobsRouter = require('../routes/jobsRoute.js');
const usersRouter = require('../routes/userRoute.js');
const applicationsRouter = require('../routes/applicationsRoute.js')

router.use('/jobs', jobsRouter);
router.use('/users', usersRouter);
router.use('/applications', applicationsRouter);

router.use(express.static(path.resolve(__dirname+"/../public/")))
router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/sign_in', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")));
router.get('/register', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/register.html")));
router.get('/aplicant', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/applicantProfile.html")));
router.get('/recruiter', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/recruiterProfile.html")));




module.exports = router;