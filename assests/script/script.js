const searchFormEl = document.getElementById("#search-form");
let pastSearch = document.getElementById("#past-search-btns");
const currentWeatherEl = document.getElementById("#currentWeather");
let currentWeatherHeader = document.getElementById("#currentWeatherHeader");
let fiveDayForecastEl = document.getElementById("#fiveDayForecast");

let searchCityHistory = [];
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;

$("#search-form").submit(function (e) { 
// document.forms["search-form"].submit();
  e.preventDefault();
let userCity = $("#search-input").val();
    $('#searchCityHistory').push(userCity);
 

  let geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355`;

  fetch(geoRequestURL).then(async function (responce) {
    const data = await responce.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    oneCall(lat, lon);
  });
});
function oneCall(lat, lon) {
  var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,daily&units=imperial&appid=e18c8f36cfe444e519c94f2dc3231355`;
  fetch(weatherRequestURL).then(async function (response) {
    const data = await response.json();

    console.log(data);
    return;
    
    function printResults(data) {
      currentWeatherHeader.textContent = data.title;
      currentWeatherEl.append(currentWeatherHeader);
      console.log(userCity)
    }
    // render() data to currentWeatherEl
    printResults();
  });
}
