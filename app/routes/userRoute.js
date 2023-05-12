const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/userHandler.js');
const {Jobs, Users} = require('../controllers/dbSchemas.js');
const bcrypt = require('bcrypt')

router.get('/appliedJobs/:id', async(req, res) => { 
    const userId = req.params.id;
    const user = await Users.findById(userId);
    const jobIdsToSearch = []
    for(const id of user.appliedJobs){
        jobIdsToSearch.push(id.toString())
    }
    const jobsFound = await Jobs.find({ _id: { $in: jobIdsToSearch}});
    console.log(jobsFound)
    res.status(200).send('llegue');
});

router.get('/login/', async(req, res) => { 
    let user = req.query.user; // 
    let password = req.query.password; //

    user = user.toLowerCase();
    password = password.toLowerCase();
    
    const userExist = await Users.findOne({ $or: [ { email: user }, { username: user } ] });

    if(userExist && bcrypt.compareSync(password, userExist.password)){
        // User exists and password is correct
        res.status(200).send('llegue');
    }
    else{
        let errorMsg = '';
        if(!userExist){
            errorMsg += 'Email or username does not exist';
        }
        else{
            errorMsg += 'Password is incorrect';
        }
        res.status(400).send(errorMsg);
    }
});


// POST Crear Usuario nuevo
router.post('/', async(req, res) => {

    const usuario = req.body
    
    usuario.email = usuario.email.toLowerCase();
    usuario.username = usuario.username.toLowerCase();
    
    const emailExist = await Users.findOne({ email: usuario.email});
    const usernameExist = await Users.findOne({ username: usuario.username});
    console.log(usuario)
    
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