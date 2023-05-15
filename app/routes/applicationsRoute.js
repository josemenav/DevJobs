const express = require('express');
const router = express.Router();
const {createApplication} = require('../controllers/applicationHandler.js');
const {Jobs, Users, Applications} = require('../controllers/dbSchemas.js');
const bcrypt = require('bcrypt')

router.get('/applicationById', async (req, res) => {
    const userId = req.query.userId;
    const jobId = req.query.jobId;
  
    const application = await Applications.findOne({ userId, jobId });
  
    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }
  
    res.status(200).json(application);
  });
  

router.post('/createApplication', async (req, res) => {
    const applicationInfo = req.body;
    console.log(applicationInfo);
    await createApplication(applicationInfo)
    res.status(200).json({ message: 'Application created' });
});

router.delete('/deleteApplication/:id', async (req, res) => {
    const applicationId = req.params.id;
    await Applications.findById(applicationId);
    await Applications.findByIdAndDelete(applicationId)
    res.status(200).send('Application Deleted Sucessfully');
});

module.exports = router;