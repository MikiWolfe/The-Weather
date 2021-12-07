var geoRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=Seattle&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355"

// "https://openweathermap.org/api/geocoding-api";
var weatherRequestURL = "https://openweathermap.org/api/geocoding-api";
var myAPIKey = "e18c8f36cfe444e519c94f2dc3231355" // just in case ;

var $containerEl; 
$containerEl =$("<div class=''></div>");
var $h2El =$("<h2 class =''>Search by City:</h2>");
var $searchCity= $("<input class= 'col-sm-2' 'row' type='text' placeholder='Enter City:' aria-label='Enter City:'>") ;
var $searchBtn =$("<button type='submit' class='btn btn-primary'> Search </button>");
$containerEl.append($h2El);
$containerEl.append($searchCity);
$containerEl.append($searchBtn);
$("body").append($containerEl);

$("searchCity").submit(function(event){
    event.preventDefault()
// $(document).ready (function(){})
// var searchHistory = localStorage.getItem('location',) 
// localStorage.setItem('location', location)
// form.addEventListener("submit")
})

function geoData(cityName){
fetch(geoRequestURL)

.then(function(responce)
{return responce.json();
})
.then(function(data){
console.log(data)
oneCall( /*provide lat and lon here */)
})

function oneCall(lat, lon){
    fetch(weatherRequestURL)
    .then(function(responce){
        return responce.json();
    })
    .then(function(data)
    {console.log(data);
    })
}

//render data to the page