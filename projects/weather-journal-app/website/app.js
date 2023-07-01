/* Global Variables */
baseURL = 'https://api.openweathermap.org/data/2.5/weather';
apiKey = 'c496e137eb92d8a7628c13d61af587c0&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// function to fetch weather data
const getWeather = async (baseUrl='', appid='', zip='') => {

    const url = baseUrl + '?zip=' + zip + '&appid=' + appid
    let temperature = ''

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
        temperature = data.main?.temp ?? 'Unknown'
    } else {
        temperature = 'Sorry. ' + data.message
    }

    return temperature
}

// function to post weather data
const postWeather = async (url='', temperature) => {

    const userResponse = document.getElementById('feelings').value;
    const weatherData = {
        temperature: temperature,
        date: newDate,
        userResponse: userResponse,
    }

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData)
    });

    const newData = await response.json();
    if (response.ok) {
        return newData
    } else {
        throw new Error('Post failed!')
    }
}

// function to retrieve weather data
const retrieveWeather = async (url='') => {

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

// function to show weather data
const showWeather = (data) => {
    document.getElementById('date').innerText = data.date;
    if (isNaN(data.temperature)) {
        temp = data.temperature
    } else {
        temp = Math.round(data.temperature)+ ' degrees'
    }
    document.getElementById('temp').innerText = temp
    document.getElementById('content').innerText = data.userResponse;
}

document.getElementById('generate').addEventListener('click', processRequest);

function processRequest() {
    
    const zip = document.getElementById('zip').value;
    
    getWeather(baseURL, apiKey, zip).then((temperature) => {
        postWeather(url='/data', temperature).then((newData) => {
            console.log(newData)
            retrieveWeather(url='/data').then((data) => {
                showWeather(data)
            }).catch((error) => {
                console.log('Retrieve Weather Error:', error)
            })
        }).catch((error) => {
            console.log('Post Weather Error:', error)
        })
    }).catch((error) => {
        console.log('Get Weather Error:', error)
    })
}
