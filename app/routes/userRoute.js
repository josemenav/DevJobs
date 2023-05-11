const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userHandler.js');
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const mongoose = require('mongoose');

// POST Crear Usuario nuevo
router.post('/', (req, res) => {

    //let usuario = {email:"test@test.com", name:"Pedrito", username:"TestUN", password:"123", typeOfUser:"Applicant"}
    //createUser(usuario);


    res.status(200).send("Hola");

});

// PUT Add Job al usuario
router.put('/', async (req, res) => {

    const userId = req.query.userId;
    const jobId = req.query.jobId;

    await Users.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } }, { new: true })

    res.status(200).send("Usuario aplico a nuevo trabajo.");

});

// DELETE Borrar Usuario por ID
router.delete('/:id', async (req, res) => {

    const usuario = req.params.id;

    await Users.findByIdAndDelete(usuario);

    res.status(200).send('Usuario borrado');

});

module.exports = router;