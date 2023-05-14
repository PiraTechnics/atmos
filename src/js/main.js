// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const container = document.querySelector('.container');
const weatherDiv = document.createElement('div');
const weatherText = document.createElement('p');
weatherText.setAttribute('class', 'fs-4');
weatherDiv.appendChild(weatherText);
container.appendChild(weatherDiv);

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const locfield = form.querySelector('input#location');
    getWeather(locfield.value, weatherText); //inherently returns a promise, so better to fill data in the function itself

    return false;
})

async function getWeather(location='London', textNode) { 
    //can pass zipcode, up address, lat/long, or city name as location

    const baseURL = 'http://api.weatherapi.com/v1/';
    const publicApiKey = '563f141a284f4cd9886223413231305';
    const requestType = 'current.json';
    const url = baseURL + requestType + '?key=' + publicApiKey + '&q=' + location;
    
    try {
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        //console.log(weatherData); //The JSON string of all weather data

        //Set the given textNode to the temperature in F
        textNode.innerText = 'Weather for ' + location + ': ' + weatherData.current.temp_f + ' Degrees Farenheit';
    } catch (error) {
        console.log('ERROR: Something asploded');
        console.log(error);
    }

}