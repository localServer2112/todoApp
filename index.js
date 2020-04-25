const express = require('express'); //import express
const app = express(); //execute express
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var path = require('path');
require('dotenv/config');


// middleware
// a middleware is a function that runs when you hit a route.
app.use(bodyparser.json())
// use the express-static middleware
app.use(express.static("public"));
// use cors
app.use(cors())
// Routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    console.log(path)
});

const todoRoute = require('./routes/todo');

app.use('/todos',todoRoute);



mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true  },
    ()=>{
        console.log("Connected to DB");
    }
)

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));