const express = require('express');
const router = express.Router();
const {createApplication} = require('../controllers/applicationHandler.js');
const {Jobs, Users, Applications} = require('../controllers/dbSchemas.js');
const bcrypt = require('bcrypt')

router.post('/createApplication', async (req, res) => {
    const applicationInfo = req.body;
    const applicationId = await createApplication(applicationInfo)
    res.status(200).json({ message: 'Application created' });
});

router.delete('/deleteApplication/:id', async (req, res) => {
    const applicationId = req.params.id;
    const applicationToDelete = await Applications.findById(applicationId);
    await Applications.findByIdAndDelete(applicationId)
    res.status(200).send('Application Deleted Sucessfully');
});

module.exports = router;