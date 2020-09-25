// Fetch Weather Class Object.
// Created with the intension of being reused 

class fetchWeather {
    // Constructor
    constructor(AppId) {
        this.applicationId = AppId;
        this.lat = 0;
        this.lon = 0;
        this.data = 0;
    }

    // Function returns JSON data when provided with a location 
    async getLocationData(location) {
        let response;
        let data;
        if (typeof(location) === "object") {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${weather.applicationId}&units=metric`);
        } else {
            try {
                response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.applicationId}&units=metric`);
            } catch (err) {
                console.log(err);
            }
        }
        data = await response.json();
        return data;
    }

    // Extract relevant fields from JSON data
    extractData(d) {
        let location = d.name;
        let currentTemp = d.main.temp;
        let minTemp = d.main.temp_min;
        let maxTemp = d.main.temp_max;
        let feelsLike = d.main.feels_like;
        console.log(`location: ${location}`);
        console.log(`currentTemp: ${currentTemp}`);
        console.log(`minTemp: ${minTemp}`);
        console.log(`maxTemp: ${maxTemp}`);
        console.log(`feelsLike: ${feelsLike}`);
    }
}