const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userHandler.js');
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// POST Crear Usuario nuevo
router.post('/', (req, res) => {
    //const user = {
    //    email:"test@test.com",
    //    name:"Pedrito",
    //    username:"TestUN",
    //    password:"123",
    //    typeOfUser:"Applicant"
    //}

    //user.password = bcrypt.hashSync(user.password, 10);
    //console.log(user)
    //console.log(bcrypt.compareSync("12", user.password))

    //createUser(user);

    res.status(200).send("Hola");

});

// PUT Add Job al applicant
router.put('/', async(req, res) => {

    const userId = req.query.userId;
    const jobId = req.query.jobId;

    await Users.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } }, { new: true })

    res.status(200).send("Usuario aplico a nuevo trabajo.");

});

//router.get('/', async(req, res) => {
//
//    const user = await Users.findById('645ceb60e33c28241c0f4df7')
//
//    console.log(bcrypt.compareSync('123', user.password))
//    res.status(200);
//
//});

// DELETE Borrar Usuario por ID
router.delete('/:id', async(req, res) => {

    const usuario = req.params.id;

    await Users.findByIdAndDelete(usuario);

    res.status(200).send('Usuario borrado');

});

module.exports = router;