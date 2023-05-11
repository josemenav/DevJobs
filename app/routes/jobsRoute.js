const express = require('express');
const router = express.Router();
const {Jobs, Users} = require('../controllers/dbSchemas.js');

// GET Jobs

router.get('/', async (req, res) => {

    const jobs = await Jobs.find({});
    console.log(jobs);
    
    res.status(200).send(jobs);

});

module.exports = router;