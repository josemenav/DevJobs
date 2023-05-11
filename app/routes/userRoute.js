const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userHandler.js');
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

router.get('/appliedJobs/:id', async(req, res) => { 
    const userId = req.params.id;
    const user = await Users.findById(userId);
    const jobIdsToSearch = []
    for(const id of user.appliedJobs){
        jobIdsToSearch.push(id.toString())
    }
    //console.log(jobIdsToSearch)
    const jobsFound = await Jobs.find({ _id: { $in: jobIdsToSearch}});
    console.log(jobsFound)
    res.status(200).send('llegue');
});


// POST Crear Usuario nuevo
router.post('/', async(req, res) => {


    //const usuario = { 
        //email:"admin@recruiter.com", 
        //name:"adminRe", 
        //username:"AdminRecruiter", 
        //password:"123", 
        //typeOfUser:"Recruiter" //Recruiter in other case
    //}

    usuario.email = usuario.email.toLowerCase();
    usuario.username = usuario.username.toLowerCase();
    
    const emailExist = await Users.findOne({ email: usuario.email});
    const usernameExist = await Users.findOne({ username: usuario.username});

    if(emailExist || usernameExist) {
        let errorMsg = '';
        if (emailExist) {
          errorMsg += 'Email is already registered. ';
        }
        if (usernameExist) {
          errorMsg += 'Username is already registered. ';
        }
        res.status(400).send(errorMsg);
    }
    else{
        usuario.password = bcrypt.hashSync(usuario.password, 10);
        createUser(usuario);
        res.status(200).send("User Created Succesfully");
    }
});

// PUT Add Job al Applicant
router.put('/addJobApplicant/', async (req, res) => {
    const userId = req.query.userId;
    const jobId = req.query.jobId;

    await Users.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } }, { new: true });
    await Jobs.findByIdAndUpdate(jobId, { $push: { applicants: userId } }, { new: true })

    res.status(200).send("Usuario aplico a nuevo trabajo.");
});

// PUT remove Job al Applicant
router.put('/removeJobApplicant/', async (req, res) => {

    const userId = req.query.userId;
    const jobId = req.query.jobId;

    await Users.findByIdAndUpdate(userId, { $pull: { appliedJobs: jobId } }, { new: true });
    await Jobs.findByIdAndUpdate(jobId, { $pull: { applicants: userId } }, { new: true });

    res.status(200).send("Usuario eliminó el trabajo aplicado.");
});

//En caso de permitir editar usuario agregar ruta aqui

// DELETE Borrar User por ID
router.delete('/:id', async (req, res) => {

    const usuario = req.params.id;

    await Users.findByIdAndDelete(usuario);

    res.status(200).send('Usuario borrado');

});

module.exports = router;