const myAppId = "f4a5dbd8a669430dab7c21d0b7d2b756";

let coords = {};
let cardHeader = document.querySelector(".card-header");
let cardBody = document.querySelector(".card-body");
let cardFooter = document.querySelector(".card-footer");
// Instantiate the fetchWeather object
let weather = new fetchWeather(myAppId);

// Handle to text weather location input
let weatherInput = document.getElementById("weather-input");

// Location Search button handle
let weatherLocationSearch = document.getElementById("input-text-search");

// Geo Location Search Button handle
let weatherGeoLocationSearch = document.getElementById("current-location-search");
let weatherContainer = document.querySelector('#weather-container');

window.onload = async() => {
    const getCoords = async() => {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
            long: pos.coords.longitude,
            lat: pos.coords.latitude,
        };
    };
    coords = await getCoords();
    console.log(coords);
};

// createCardHtml function used to render the weather info 
createCardHtml = (loc, region, tcur, tmin, tmax, tlike, icon) => `
 <div class="card">
    <div class="row no-gutters align-items-center">    
      <div class="col-2 h2 pl-1 pt-1 text-center">                
        <img src="./icons/${icon}@2x.png"> 
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
            <span><h2>${loc},${region}</h2></span>
            <h5>Feels like ${tlike}&#8451</h5><br> 
            <h5>Tmax: ${tmax}&#8451  |  Tmin: ${tmin}&#8451 </h2>
          </div>
          <div class="row">
            <h5 class="card-subtitle text-muted">${tcur}&#8451</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
`
    // Event Listnet method for Location Search click event.
    // Function retrieves JSON data by calling .getLocationData() method
weatherLocationSearch.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("--------- Weather Calling Text Search  ------------")
        // data = weather.getLocationData(weatherInput.value);
    console.log("-----------FINAL------------------");
    getData(weatherInput.value);

});

// Event Listnet method for Geo Location Search click event.
// Function retrieves JSON data by calling .getGeoLocation() method
weatherGeoLocationSearch.addEventListener('click', (event) => {
    event.preventDefault();

    console.log("--------- NEW promise and new try      ------------")
        // let coords = returnCoords();
    console.log(window.coords);

    console.log("--------- Weather Geo Location Search  ------------")
        // weather.getGeoLocationData();
        // data = weather.getLocationData(coords);
    getData(coords);
});

let getData = async(loc) => {
    d = await weather.getLocationData(loc);
    // weather.extractData(d);
    const htmlStr = createCardHtml(d.name, d.sys.country, d.main.temp, d.main.temp_min, d.main.temp_max, d.main.feels_like, d.weather[0].icon)
    console.log(htmlStr);
    weatherContainer.innerHTML = htmlStr;
}