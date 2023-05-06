const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = require('./app/routes/router')

const port = 5000; 

app.use('/', router()); 

app.listen(port); 