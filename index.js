const express = require('express'); //import express
const app = express(); //execute express
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config');


// middleware
// a middleware is a function that runs when you hit a route.
app.use(bodyparser.json())
// use the express-static middleware
app.use(express.static("public"))
// Routes
app.get('/', (req,res) =>{
    res.send('We are home');
})

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