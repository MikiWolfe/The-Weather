const searchBtn = document.getElementById("search-btn")
const searchFormEl = document.getElementById("search-form");
let pastSearch = document.getElementById("past-search-btns");
const currentWeatherEl = document.getElementById("currentWeather");
let currentWeatherHeader = document.getElementById("currentWeatherHeader");
let fiveDayForecastEl = document.getElementById("fiveDayForecast");
let currentTemp = document.getElementById("current-temp");
let currentWind = document.getElementById("current-wind");
let currentHumid = document.getElementById("current-humidity");
let currentUV = document.getElementById("current-UV");
let currentTime = moment().format("MMMM Do YYYY");
// let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";

let searchCityHistory = [];
let userCity = null;
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;
moment();
function printResults(data) {
  currentWeatherHeader.innerHTML =
    "Current City : " +
    userCity +
    " " +
    currentTime +
    data.current.weather[0].icon;
    // Coverting celsius to fahrenheit
    let celsius = data["current"]["temp"]
    var fahr = ((celsius * 9) /5 ) + 32;
  currentTemp.innerHTML = "Temp : " + fahr + "°F"  + " / " + celsius  + "°C";
  currentWind.innerHTML = "Wind : " + data["current"]["wind_speed"] + " MPH";
  currentHumid.innerHTML = "Humidity : " + data["current"]["humidity"] + "%";
  currentUV.innerHTML = "UV Index : " + data.current.uvi;
}

$("#search-form").submit(function (e) {
  e.preventDefault();
  userCity = $("#search-input").val();
  searchCityHistory.push(userCity);
  displayPastCity();

  let geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${myAPIKey}`;
  // this function gets the lat and lon using user city data to plug in to the the weather api
  fetch(geoRequestURL).then(async function (responce) {
    const data = await responce.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    oneCall(lat, lon);
  });
});
// this function gets weather data from API
function oneCall(lat, lon) {
  var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,daily&units=imperial&appid=${myAPIKey}`;
  fetch(weatherRequestURL).then(async function (response) {
    const data = await response.json();

    console.log(data);
    printResults(data);
    return;
  });
}
function displayPastCity() {
  for (let i = 0; i < searchCityHistory.length; i++) {
    let pastBtn = document.createElement("button");

    pastSearch.appendChild(pastBtn);
    pastBtn.classList.add('btn', 'btn-secondary', 'btn-block')

    // id, value, onclick and attributes
    //  <button class="btn btn-secondary btn-block">Past City</button>
  }
};

// clear local storage
clearBtn = document.createElement("button")
clearBtn.classList.add('btn-danger', 'btn-block' , 'btn')
clearBtn.innerHTML = "Clear Search";
pastSearch.appendChild(clearBtn)
pastSearch.addEventListener("click", function(){
  localStorage.clear()
})



