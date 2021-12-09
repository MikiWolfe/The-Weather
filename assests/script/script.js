const searchFormEl = document.getElementById("search-form");
let pastSearch = document.getElementById("past-search-btns");
const currentWeatherEl = document.getElementById("currentWeather");
let currentWeatherHeader = document.getElementById("currentWeatherHeader");
let fiveDayForecastEl = document.getElementById("fiveDayForecast");
let currentTemp = document.getElementById("current-temp");
let currentWind = document.getElementById("current-wind");
let currentHumid = document.getElementById("current-humidity");
let currentUV = document.getElementById("current-UV");
let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

let searchCityHistory = [];
let userCity = null 
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;

function printResults(data) {
  currentWeatherHeader.innerHTML ="Current City : " + userCity + " " + currentTime;
  currentTemp.innerHTML = "Temp : " + data['current']['temp'];
  currentWind.innerHTML = "Wind : " + data['current']['weather']['wind_speed'];
  currentHumid.innerHTML = "Humidity : " + data['current']['humidity']
}

$("#search-form").submit(function (e) { 
// document.forms["search-form"].submit();
  e.preventDefault();
 userCity = $("#search-input").val();
 searchCityHistory.push(userCity)
 displayPastCity()
 
console.log("hi Kris" , searchCityHistory)    
   let geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355`;
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
  var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,daily&units=imperial&appid=e18c8f36cfe444e519c94f2dc3231355`;
  fetch(weatherRequestURL).then(async function (response) {
    const data = await response.json();

    console.log(data);
    printResults(data)
    return;
    
    // TODO:this function does not work function does not come when called.  
    
    // TODO: render() data to currentWeatherEl
    // print data to the page. would love to use dynmic HTML but understand if not today
    // 
   
  });
}
function displayPastCity(){
  for (let i = 0; i < searchCityHistory.length; i++) {
    let pastBtn = document.createElement("button")

    pastSearch.appendChild(pastBtn)
    // id, value, onclick and attributes

  }}
  
  moment();