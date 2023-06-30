/* Global Variables */
baseURL = 'https://api.openweathermap.org/data/2.5/weather';
apiKey = 'c496e137eb92d8a7628c13d61af587c0&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// function to fetch weather data
const getWeather = async (baseUrl='', appid='', zip='') => {

    const url = baseUrl + '?zip=' + zip + '&appid=' + appid

    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

// function to post weather data
const postWeather = async (url='', data={}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
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

    try {
        const projectData = await response.json();
        return projectData;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('generate').addEventListener('click', processRequest);

function processRequest() {
    
    const zip = document.getElementById('zip').value;
    
    getWeather(baseURL, apiKey, zip).then((data) => {    
        const userResponse = document.getElementById('feelings').value;
        const weatherData = {
            temperature: data.main.temp,
            date: newDate,
            userResponse: userResponse,
        }
        postWeather(url='/data', weatherData).then((data) => {
            retrieveWeather(url='/data').then((data) => {
                console.log(data);
                document.getElementById('date').innerText = data.date;
                document.getElementById('temp').innerText = Math.round(data.temperature)+ ' degrees'
                document.getElementById('content').innerText = data.userResponse;
            });
        })
    })
}