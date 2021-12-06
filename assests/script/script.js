var geoRequestURL ="https://openweathermap.org/api/geocoding-api";
var weatherRequestURL = "https://openweathermap.org/api/geocoding-api";
var myAPIKey = "e18c8f36cfe444e519c94f2dc3231355" // just in case ;

var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-btn");


var searchHistory = localStorage.getItem('location',) 


localStorage.setItem('location', location)

form.addEventListener("submit")
.then()
$(document).ready (function(){
fetch(geoRequestURL)
.then(function(responce)
{return responce.json();
})

fetch(weatherRequestURL);


})