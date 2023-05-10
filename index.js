const mongoose = require('mongoose');
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = require('./app/routes/router')

const port = 5000; 

app.use('/', router()); 
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

connect()
app.listen(port); 