const APP_ID ='f33214141fa15be966dc471bc8418396';
let weatherPreference = "weather";
const WeatherHandler = {
    init: function () {
        const getWeatherButton = document.getElementById('getWeater');
        getWeatherButton.addEventListener ('click', () => {
            this.handleClick();
        }) 
    },
    tableBody: document.getElementById ('tableBody'),
    handleClick: function () {
        const country = document.getElementById('country').value;
        this.tableBody.innerHTML = "";
        if (weatherPreference != null && country != null && weatherPreference != undefined && country != undefined) {
            this.fetchWeatherData (country, weatherPreference);
        }
    },
    country: document.getElementById('country').value,
    fetchWeatherData: function (country, weatherPreference) {
        const forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q='+ country +'&APPID='+APP_ID;
        const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='+ country +'&APPID='+APP_ID;
        if ( weatherPreference === "weather") {
            fetch ( weatherURL ).then( (responseData) => responseData.json()).then (data => {
                this.processData (data, weatherPreference);
            })
        } else if ( weatherPreference === "forecast" ) {
            fetch ( forecastURL ).then( (responseData) => responseData.json()).then (data => {
                this.processData (data, weatherPreference);
            })
        }
        document.querySelector('.date-container').innerHTML = `<p>Weather Report today in <span class="country-weather"> ${country} </span> at ${Date().slice(0, 24)}</p>`;
    },
    processData: function (data, weatherPreference) {
        console.log (data);
        let options = {};
        if (weatherPreference === "weather") {
            options.temperature = data.main.temp;
            options.minTemperature = data.main.temp_min;
            options.maxTemperature = data.main.temp_max;
            options.humidity = data.main.pressure;
            options.pressure = data.main.humidity;
            this.addRows ([options]);
        } else {
            //Constructs an array of Objects to construct table
            options = data.list.map( currValue => {
                let optionsObj = {};
                let mainArray = currValue.main;
                optionsObj.temperature = mainArray["temp"];
                optionsObj.minTemperature = mainArray["temp_min"];
                optionsObj.maxTemperature = mainArray["temp_max"];
                optionsObj.humidity = mainArray["humidity"];
                optionsObj.pressure = mainArray["pressure"];
                return [optionsObj];
            })
            this.addRows (options);
        }
    },
    addRows: function (options) {
        console.log (options);
        for (let loop = 0; loop < options.length; loop++){
            let iterator;
            if (options.length > 1) {
                iterator = options[loop];
            } else {
                iterator = options;
            }
            iterator.forEach (val => {
                let row = document.createElement('tr')
                let temp = document.createElement ('td')
                temp.textContent = val.temperature;
                let minTemp = document.createElement ('td');
                minTemp.textContent = val.minTemperature.toString();
                let maxTemp = document.createElement ('td');
                maxTemp.textContent = val.maxTemperature;
                let humidity = document.createElement ('td');
                humidity.textContent = val.humidity;
                let pressure = document.createElement ('td');
                pressure.textContent = val.pressure;
                row.append(temp);
                row.append(minTemp);
                row.append(maxTemp);
                row.append(humidity);
                row.append(pressure);
                WeatherHandler.tableBody.appendChild(row);
            })
        }
        document.querySelector('.table-container').classList.remove('hide');
    }
}

document.getElementById('weatherSelector').addEventListener ('click', () => {
    weatherPreference = "weather"
});
document.getElementById('forecastSelector').addEventListener ('click', () => {
    weatherPreference = "forecast";
});
