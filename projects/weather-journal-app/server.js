// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/data', getData);

app.post('/data', addData);

function getData(req, res) {
    res.send(projectData);
}

function addData(req, res) {
    reqBody = req.body;

    projectData = {
        temperature: reqBody.temperature,
        date: reqBody.date,
        userResponse: reqBody.userResponse
    }
    
    const response = {
        message: 'Weather data added successfully!'
    }
    res.status = 200;
    res.send(response);
}

const port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
