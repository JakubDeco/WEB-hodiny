import {credentials} from './resource/credentials.js'
// import {TreeFrog} from '../classes/treeFrog.js'
// let zvieratko = new Animal('mátoha', 'zelená', news);


// //zvieratko.die();

// // zvieratko.dead = false;
// // console.log(zvieratko.dead);//zasa žije

// // zvieratko.isAlive();
// // zvieratko.makeSound();

// const zaba1 = new TreeFrog('janka', 'zelena', news);
// //zaba1.isAlive();
// zaba1.makeSound();
// //zaba1.makeForecast();

// var hocijak = 'haha'
// function hocijaka() {
    //     console.log(hocijak)
    // }
    
//let news = document.getElementById('news');

//`const apiKey = require('./resource/credentials.json')

document.getElementById('weather-btn').addEventListener('click', () => {
    if (document.getElementById('city-input').value !== "" 
    && document.getElementById('country-input').value !== "") {
        getWeatherAtLocation()
    }

})
const apiKeys = {}

chrome.storage.sync.get(['weatherAPIKey'],(url) => {
    apiKeys.openweathermap = url.weatherAPIKey
})
chrome.storage.sync.get(['weatherAPIKey'],(url) => {
    apiKeys.opencagedata = url.geoAPIKey
})

function getWeatherAtLocation() {
    //https://cms-assets.tutsplus.com/uploads/users/30/posts/33893/final_image/app.png
    const city = document.getElementById('city-input').value
    const country = document.getElementById('country-input').value
    //const apiKey = credentials.apiKeys.opencagedata
    //const apiKey = credentials.apiKeys.opencagedata

    // forward geolocation
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${apiKeys.opencagedata}`)
        .then(resp => {
            return resp.json()
        }).then(json => {

            //console.log(json)

            const cityCountry = json.results[0].components.city + ', ' + json.results[0].components["ISO_3166-1_alpha-3"]

            const lat = json.results[0].geometry.lat;
            const lon = json.results[0].geometry.lng;
            //const apiKey = credentials.apiKeys.openweathermap;
            const exclude = 'curent,minutely,hourly,alerts'
            const units = 'metric';
            // console.log(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=${units}`)

            // requesting current weather at given location
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKeys.openweathermap}&units=${units}`)
                .then(resp =>
                    resp.json()
                ).then(json => {
                    createWeatherCard(json, cityCountry)
                }).catch(error => {
                    console.log(error)
                })
        }).catch(error => {
            console.log(error)
        })
}

const createWeatherCard = (json, cityCountry) => {
    //console.log(json)
    const weatherCard = document.createElement('div')
    weatherCard.className = "weatherCard"

    const location = document.createElement('span')
    location.className = 'location-span'
    location.textContent = cityCountry

    const temp = document.createElement('span')
    temp.className = 'temp-span'
    temp.textContent = Math.round(json.daily[0].temp.day) + '°C'

    const icon = document.createElement('img')
    icon.src=`http://openweathermap.org/img/wn/${json.daily[0].weather[0].icon}@2x.png`
    
    const description = document.createElement('span')
    description.className = 'description-span'
    description.textContent = json.daily[0].weather[0].description

    weatherCard.appendChild(location)
    weatherCard.appendChild(temp)
    weatherCard.appendChild(icon)
    weatherCard.appendChild(description)

    document.getElementById('weather-container').appendChild(weatherCard)
    }
