const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userHandler.js');

router.get('/', (req, res) => {
    let usuario = {email:"test@test.com", name:"Pedrito", username:"TestUN", password:"123", typeOfUser:"Applicant"}
    createUser(usuario);
    res.status(200).send("A ver");

});

module.exports = router;