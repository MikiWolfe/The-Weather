// "https://openweathermap.org/api/geocoding-api";
var button = $("#btn");
var weatherRequestURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;

// $(document).ready (function(){})
button.on("click", function (e) {
  e.preventDefault();
  var userCity = $("#search-input").val();
  var geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355`;
  //console.log("userCity", userCity);

  fetch(geoRequestURL)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .then(function (geoRes) {
      console.log(geoRes);
      let lat = geoRes[0].lat;
      let lon = geoRes[0].lon;

      console.log("lat and lon", lat, lon);

//       let oneCallApi = `https://www.google.com${lon}=${lat}`;

//       $.ajax({
//         url: oneCallApi,
//         method: "GET",
//       }).then(function (geoRes) {
//         console.log(geoRes);
//         let lat = geoRes[0].lat;
//         let lon = geoRes[0].lon;

//         console.log("lat and lon", lat, lon);

//         $.ajax();
//       });
    });
});

// oneCall( /*provide lat and lon here */)
// }
// )
// function oneCall(lat, lon){
//     fetch(weatherRequestURL)
//     .then(function(responce){
//         return responce.json();
//     })
//     .then(function(data)
//     {console.log(data);
//     })
// }

//render data to the page
