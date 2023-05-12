const express = require('express');
const router = express.Router();
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const { createJob } = require('../controllers/jobHandler.js');
const mongoose = require('mongoose');

// GET Jobs

router.get('/', async (req, res) => {

    const jobs = await Jobs.find({status: 'On Going'});    
    res.status(200).send(jobs);
});

router.post('/createJob/:id', async (req, res) => {

    const data = {
        title: 'Cocinero', 
        description: 'Cocinero michelin', 
        salary: 15000, 
        shift: 'Day', 
        modality: 'In Office', 
        company: 'McDonalds',  
    }

    data.author = req.params.id;
    data.status = 'On Going';

    const jobId = await createJob(data)
    await Users.findByIdAndUpdate(data.author, { $push: { postedJobs: jobId } }, { new: true });

    res.status(200).send('Job created\n');
});

router.put('/editJob/:id', async (req, res) => {

    //Falta ver como recibir los datos

    //await Users.findByIdAndUpdate(); y actualizar segun que datos fueron dados para no sobre escribir todo

});

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