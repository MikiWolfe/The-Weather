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
$("#search-form").submit((e) => {
  e.preventDefault();
  userCity = $("#search-input").val();
  searchCityHistory.push(userCity);
  localStorage.setItem("userCity", JSON.stringify(searchCityHistory));
  // displayPastCity();
  
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
    printResults(data);    
    displayFiveDay(data);
    return; 
  });
}

// TODO:
function displayPastCity() {
   {
    let cityHistory = JSON.parse(localStorage.getItem("searchCityHistory"));
    if(!cityHistory == null){
      searchCityHistory = cityHistory
    };

    for (let i = 0; i < searchCityHistory.length; i++){
      if (i === 8){
        break;
      }
    let pastBtn = document.createElement("button");
    pastBtn.classList.add("btn", "btn-secondary", "btn-block", "caps");
    pastBtn.setAttribute("value", searchCityHistory[i]);}
    pastBtn.text(searchCityHistory[i]);
    pastBtn.addEventListener("click", function () {});
    pastSearch.appendChild(pastBtn);
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
