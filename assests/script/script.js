const searchBtn = document.getElementById("search-btn");
const searchFormEl = document.getElementById("search-form");
let pastSearch = document.getElementById("past-search-btns");
const currentWeatherEl = document.getElementById("currentWeather");
let currentWeatherHeader = document.getElementById("currentWeatherHeader");
let fiveDayForecastEl = document.getElementById("fiveDayForecast");
let currentTemp = document.getElementById("current-temp");
let currentWind = document.getElementById("current-wind");
let currentHumid = document.getElementById("current-humidity");
let currentUV = document.getElementById("current-UV");
let dayOne = document.getElementById("dayOne");
let currentDay = moment().format("MMMM Do YYYY");

let searchCityHistory = [];
let userCity = null;
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;

moment();

function printResults(data) {
  let weatherIcon = data.current.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  img = document.createElement('img')
  img.src = iconURL
  currentWeatherHeader.innerHTML =
    "Current City : " + userCity + " : " + currentDay;
  currentWeatherHeader.appendChild(img)
  currentTemp.innerHTML = "Temp : " + data["current"]["temp"] +"°F" ;
  currentWind.innerHTML = "Wind : " + data["current"]["wind_speed"] + " MPH";
  currentHumid.innerHTML = "Humidity : " + data["current"]["humidity"] + "%";
  currentUV.innerHTML = "UV Index : " + data.current.uvi;
}
function displayFiveDay(data) {
  let date = currentDay;
  document.getElementById('dayOne').innerHTML = date
  let dailyIcon = data.daily[0].weather[0].icon
  let iconURL = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;
  img = document.createElement('img')
  img.src = iconURL
  document.getElementById("cardOne").appendChild(img)
  // for (let i = 0; i < 5; i++) {
  
  //   //  let temp =
  //   let celsius = data["current"]["temp"];
  //   let fahr = (celsius * 9) / 5 + 32;
  //   let wind = data.daily[i + 1].wind_speed;
  //   let humid = data.daily[i + 1].humidity;

  //   dayOne.innerHTML = data.daily[1].temp.day;
  // }

  // div class="card">
  // <div class="card-body">
  //   <h5 class="card-title">Date:</h5>
  //   <p class="card-text">Temp:</p>
  //   <p class="card-text">Wind:</p>
  //   <p class="card-text">Humidity:</p>

  // </div>
}
$("#search-form").submit(function (e) {
  e.preventDefault();
  userCity = $("#search-input").val();
  searchCityHistory.push(userCity);
  localStorage.setItem("userCity", JSON.stringify(searchCityHistory));
  displayPastCity();
  
  let geoRequestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${myAPIKey}`;
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
  var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,&units=imperial&appid=${myAPIKey}`;
  fetch(weatherRequestURL).then(async function (response) {
    const data = await response.json();
    
    console.log(data);
    printResults(data);
    displayFiveDay()

    return;
  });
}

function displayPastCity() {
  for (let i = 0; i < searchCityHistory.length; i++) {
    let pastBtn = document.createElement("button");     
    pastBtn.classList.add("btn", "btn-secondary", "btn-block", "caps");
    // pastBtn.setAttribute(
    //   "onClick",
    //   "(this.value)"
    // );
    pastBtn.addEventListener("click", function(){
    pastBtn.value  
    pastSearch.appendChild(pastBtn);
    })
    
  }
}

// clear local storage
clearBtn = document.createElement("button");
clearBtn.classList.add("btn-danger", "btn-block", "btn", "caps");
clearBtn.innerHTML = "Clear Search";
pastSearch.appendChild(clearBtn);
pastSearch.addEventListener("click", function () {
  localStorage.clear();
});
