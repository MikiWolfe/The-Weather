
const button =document.getElementById("#btn")
const searchFormEl = document.getElementById("#search-form")
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;


$("#search-form").submit( function (e) {
  e.preventDefault();
  let userCity = $("#search-input").val();
  let geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355`;
  
  fetch(geoRequestURL)
  .then(async function (responce) {
    const data= await responce.json();
    
    console.log(data); 
    const lat = data[0].lat;
    const lon = data[0].lon;
    
    console.log("lat and lon", lat, lon);
    oneCall(lat, lon)    
  })
  
});

function oneCall(lat, lon){
      var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly,daily&units=imperial&appid=e18c8f36cfe444e519c94f2dc3231355`;
      fetch(weatherRequestURL)
        .then(async function(response){
        const data = await response.json();  
          
        console.log(data)
// let htlm =data.data.map(current =>{
  // return 'current' + current.temp
// })
// render(data){}'The Weather today for' + 'userCity' ':'



})}  