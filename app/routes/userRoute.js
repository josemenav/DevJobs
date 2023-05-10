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

// DELETE Borrar Usuario por ID
router.delete('/:id', async (req, res) => {

    const usuario = req.params.id;

    await Users.findByIdAndDelete(usuario);

    res.status(200).send('Usuario borrado');

});

module.exports = router;