import {Animal} from './animal.js'
export class TreeFrog extends Animal {
    constructor(name, colour, news, pohlavie) {
        super(name, colour, news)
        this.pohlavie = pohlavie
        this.weather = this.#createWeatherForecast()
    }

    #createWeatherForecast() {
        let weatherParagraph = document.getElementById("weather")
        if (!weatherParagraph) {
            weatherParagraph = document.createElement("p")
            weatherParagraph.id = "weather"
            document.body.appendChild(weatherParagraph)
            return weatherParagraph
        }
        return document.getElementById("weather")
    }

    makeForecast() {
        const forecast = 'bude pekne'
        if (this._dead) {
            this.informWorld('nic uz nebude predpovedat')
        } else {

            const lat = 48.7139;
            const lon = 21.2581;
            const cityCountry = 'Kosice,SK';
            const apiKey = '6e973c1a92ecda9c2e803e5aed8f6dba';
            const exclude = 'curent,minutely,hourly,alerts'
            const units = 'metric';
            // console.log(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=${units}`)

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}&units=${units}`)
                .then(resp =>
                    // resp.ok ? resp.json() : resp.statusText + ' ' + resp.status
                    resp.json()
                ).then(json => {
                    console.log(json) // just a check
                    this.weather.innerHTML += (`<br>${this.constructor.name} ${this.name} na zajtra hlasi: 
                    ${json.daily[1].weather[0].description} ${json.daily[1].temp.day}°C v ${cityCountry}`)
                }).catch(error => {
                    console.log(error)
                    this.weather.innerHTML += (`<br> ${this.constructor.name} ${this.name} na zajtra nevie predpovedat pocasie`)
                })

            /* ...... current weather info: description, temperature and location ..........
            this.weather.innerHTML += (`<br> ${this.constructor.name} ${this.name} ${forecast}`)

            const apiKey = '6e973c1a92ecda9c2e803e5aed8f6dba';
            const mestoKrajina = 'Kosice,SK'
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + mestoKrajina + '&appid=' + apiKey + '&units=metric')
                .then(resp => {
                    if (!resp.ok) {
                        return (resp.statusText + " " + resp.status)
                    } else {
                        return resp.json()

                    }
                })
                .then(json => {

                    this.weather.innerHTML += ("<br>" + this.constructor.name + " " + this.name + ": " +  
                    + `: ${json.weather[0].description} ${json.main.temp}°C v ${json.name}`)
                })
                .catch(error => {
                    console.log(error)
                });*/
        }

        // window.open('http://www.shmu.sk/')
    }

    currentWeatherAtLocation(lat, lon){

    }

    informWorld(message) {
        super.informWorld(message);
        if (!this._dead) {
            this.news.innerHTML += 'kvak'
        }
    }

    makeSound() {
        if (this._dead) {
            this.informWorld('...+...');
        } else {
            this.informWorld(' kvaaaak');
        }
    }
}