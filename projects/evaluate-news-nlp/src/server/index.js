const path = require('path')
const express = require('express')
const cors = require('cors')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const fetch = require("node-fetch");
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();

const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(cors(corsOptions))
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/sentiment', async (req, res) => {
    const sentimentAPI = 'https://api.meaningcloud.com/sentiment-2.1'
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("url", req.query.url);
    formdata.append("lang", "en");

    const response = await fetch(sentimentAPI, {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    })

    const sentiment = await response.json();
    let resBody = {}
    
    if (response.ok) {
        if (sentiment.status.code=='0') {
            // build succeess response object
            res.status = 200
            resBody = {
                polarity: sentiment.score_tag,
                subjectivity: sentiment.subjectivity,
                agreement: sentiment.agreement,
                confidence: sentiment.confidence,
                irony: sentiment.irony
            }
        } else {
            // build error response object
            res.status = 400
            resBody = {
                code: sentiment.status.code,
                message: sentiment.status.msg
            }
        }
    } else {
        // build server error object
        res.status = 500
        resBody = {
            message: 'Error analysing sentiment'
        }
    }

    res.send(resBody);
})