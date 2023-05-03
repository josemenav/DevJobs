const express = require('express'); 
const app = express(); 

const port = 5000; 

app.use('/', (req, res) => {
    res.send('Funciona'); 
})

app.listen(port); 