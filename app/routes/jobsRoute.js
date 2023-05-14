const express = require('express');
const router = express.Router();
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const { createJob } = require('../controllers/jobHandler.js');
const mongoose = require('mongoose');

// GET Jobs

router.get('/', async (req, res) => {

    const jobs = await Jobs.find({status: 'On Going'});

    res.status(200).json(jobs);
});


// POST Create new Job

router.post('/createJob', async (req, res) => {

    const jobInfo = req.body;

    const jobId = await createJob(jobInfo)
    await Users.findByIdAndUpdate(jobInfo.author, { $push: { postedJobs: jobId } }, { new: true });

    res.status(200).json({ message: 'Job created' });
});


// PUT Edit Job

router.put('/editJob/:id', async (req, res) => {

    //Falta ver como recibir los datos

    //await Users.findByIdAndUpdate(); y actualizar segun que datos fueron dados para no sobre escribir todo

});


// DELETE Existing Job

router.delete('/deleteJob/:id', async (req, res) => {

    const jobId = req.params.id;

    const jobToDelete = await Jobs.findById(jobId);
    const authorId = jobToDelete.author.toString();
    const applicantsIds = jobToDelete.applicants;

    await Users.updateMany( { _id: { $in: applicantsIds } }, { $pull: { appliedJobs: jobId } }, { new: true });
    await Users.findByIdAndUpdate(authorId, { $pull: { postedJobs: jobId } }, { new: true });
    await Jobs.findByIdAndDelete(jobId)

    res.status(200).send('Job Deleted Sucessfully');
});

module.exports = router;