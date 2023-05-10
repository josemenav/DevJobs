const mongoose = require('mongoose');
const express = require('express'); 
const cors = require('cors');
const path = require('path'); 
const router = require('./app/controllers/router.js')

const app = express(); 
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

async function connect(){
    const mongoConection = "mongodb+srv://admin:admin@myapp.qtsgqot.mongodb.net/MyAppDB";
    let db = mongoose.connection;
    db.on('connecting', () => {
        console.log('Connecting...');
    });
    db.on('connected', () => {
        console.log('Connected succesfully');
    });
    await mongoose.connect(mongoConection, {useNewUrlParser: true});
}

app.use('/', router); 

connect();

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
})

