const express = require('express');
const router = express.Router();
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const { createJob } = require('../controllers/jobHandler.js');
const mongoose = require('mongoose');

// GET Jobs
router.get('/', async (req, res) => {

    const jobs = await Jobs.find();

    res.status(200).json(jobs);
});

// GET On Going Jobs
router.get('/ongoingJobs', async (req, res) => {

    const jobs = await Jobs.find({status: 'On Going'});

    res.status(200).json(jobs);
});

// GET JobById
router.get('/jobById', async (req, res) => {

    const id = req.query.id;
    const job = await Jobs.findById(id);

    res.status(200).json(job);
});


// POST Create new Job
router.post('/createJob', async (req, res) => {

    const jobInfo = req.body;

    const jobId = await createJob(jobInfo)
    await Users.findByIdAndUpdate(jobInfo.author, { $push: { postedJobs: jobId } }, { new: true });

    res.status(200).json({ message: 'Job created' });
});


// PUT Edit Job
router.put('/editJob', async (req, res) => {

    const job = req.body;
    const id = req.query.id
    await Jobs.findByIdAndUpdate(id, {title: job.title, description: job.description, salary: job.salary, shift: job.shift, modality: job.modality, company: job.company}, {new: true});

    res.status(200).json({ message: 'Job updated' });
});

// PUT Complete status Job
router.put('/completeJob', async(req, res) => {

    const id = req.query.id

    await Jobs.findByIdAndUpdate(id, {status: 'Finished'}, {new: true});

    res.status(200).json({message: 'Status Complete'})
});

// PUT Canceled status Job
router.put('/cancelJob', async(req, res) => {

    const id = req.query.id

    await Jobs.findByIdAndUpdate(id, {status: 'Canceled'}, {new: true});

    res.status(200).json({message: 'Status Complete'})
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