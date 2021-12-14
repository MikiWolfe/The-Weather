const searchBtn = document.getElementById("search-btn");
const searchFormEl = document.getElementById("search-form");
let pastSearch = document.getElementById("past-search-btns");
const currentWeatherEl = document.getElementById("currentWeather");
let currentWeatherHeader = document.getElementById("currentWeatherHeader");
let currentTemp = document.getElementById("current-temp");
let currentWind = document.getElementById("current-wind");
let currentHumid = document.getElementById("current-humidity");
let currentUV = document.getElementById("current-UV");
let fiveDayForecastEl = document.getElementById("fiveDayForecast");
let currentDay = moment().format("MMMM Do YYYY");
let searchCityHistory = [];
let userCity = null;
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;
moment();

// Rendering current weather to the page: 
function printResults(data) {
  let weatherIcon = data.current.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png `;
  img = document.createElement("img");
  img.src = iconURL;
  currentWeatherHeader.innerHTML = userCity + " : " + currentDay;
  currentWeatherHeader.append(img);
  currentTemp.innerHTML = "Temp : " + data["current"]["temp"] + "°F";
  currentWind.innerHTML = "Wind : " + data["current"]["wind_speed"] + " MPH";
  currentHumid.innerHTML = "Humidity : " + data["current"]["humidity"] + "%";
  currentUV.innerHTML = "UV Index : " + data.current.uvi;
  if (data.current.uvi < 4) {
    currentUV.setAttribute("class", "green");
  } else if (data.current.uvi.value < 8) {
    currentUV.setAttribute("class", "yellow");
  } else {
    currentUV.setAttribute("class", "red");
  }
}
// Rendering five day forecast to the page 
function displayFiveDay(data) {
fiveDayForecastEl.innerHTML = " "
 console.log(data);
  for (let i = 1; i < 6; i++) {
    let fiveCard = $("<div>").attr(
      "class" , " card - body bg-secondary text-white col-sm-5"
      );
      $("#fiveDayForecast").append(fiveCard);
      let time = moment().add(i, "day").format("MMM Do YY");
      let day = $("<p>").html(time);
      fiveCard.append(day);
      let fiveIcon = data.daily[i].weather[0].icon;
      let iconURL = `https://openweathermap.org/img/wn/${fiveIcon}@2x.png`;
      img = document.createElement("img");
      img.src = iconURL;
      fiveCard.append(img);
      let fiveTemp = "Temp:" + data.daily[i].temp.day + "°F";
      let temp = $("<p>").html(fiveTemp);
      fiveCard.append(temp);
    let fiveWind = "Wind spd:" + "  " + data.daily[i].wind_speed + " " + "MPH";
    let wind = $("<p>").html(fiveWind);
    fiveCard.append(wind);
    let fiveHumid = "Humidity:" + "  " + data.daily[i].humidity + "%";
    let humid = $("<p>").html(fiveHumid);
    fiveCard.append(humid);
  }
}

// Search from to collect city name from user:
function run(nameOfCity){ 
  userCity = nameOfCity;
  searchCityHistory.push(userCity);
  localStorage.setItem("cityNames", JSON.stringify(searchCityHistory));
 
  
  // using lat and lon from user city to plug in to the the weather api
  let geoRequestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${myAPIKey}`;
  fetch(geoRequestURL).then(async function (responce) {
    const data = await responce.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    oneCall(lat, lon);
  }); }

$("#search-form").submit((e) => {
  e.preventDefault();
  run($("#search-input").val())
  renderPastCity()
});
//  weather data from One Call Weather API
function oneCall(lat, lon) {
  var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,&units=imperial&appid=${myAPIKey}`;
  fetch(weatherRequestURL).then(async function (response) {
    const data = await response.json();
    printResults(data);    
    displayFiveDay(data);
    return; 
  });
}
function renderPastCity() {
  $("#past-search-btns").empty()
  
  console.log(localStorage)
  let cityNames = JSON.parse(localStorage.getItem('cityNames'))
  for (let i = 0; i < cityNames.length; i++) {
    let pastBtn = document.createElement("button");
    pastBtn.classList.add("btn", "btn-secondary", "btn-block", "caps");
    pastBtn.setAttribute("type" , "caps");
    pastBtn.innerHTML = cityNames[i]
    pastBtn.setAttribute("value", cityNames[i]);
    pastBtn.addEventListener("click", function () {
    run(cityNames[i])
  });
  pastSearch.append(pastBtn);
}
}


// Clear local storage
let clearBtn = document.getElementById("clear-btn");
clearBtn.classList.add("btn-danger", "btn-block", "btn", "caps");
clearBtn.innerHTML = "Clear Search";
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  $("#past-search-btns").empty()
});
