const express = require('express');
const path = require('path');
const router = express.Router();

const jobsRouter = require('../routes/jobsRoute.js');
const usersRouter = require('../routes/userRoute.js');

router.use('/jobs', jobsRouter);
router.use('/users', usersRouter);

router.use(express.static(path.resolve(__dirname + "/../public/")))
router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/shopping_cart.html")));


module.exports = router;