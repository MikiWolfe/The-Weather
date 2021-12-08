const button = $("#btn");
const myAPIKey = "e18c8f36cfe444e519c94f2dc3231355"; // just in case ;
    
 function oneCall(lat, lon){
      var weatherRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e18c8f36cfe444e519c94f2dc3231355`;
      fetch(weatherRequestURL)
        .then(async function(response){
        const data = await response.json();    
        console.log(data)
})}
    
// $(document).ready (function(){})
button.on("click", function (e) {
  e.preventDefault();
  let userCity = $("#search-input").val();
  let geoRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=e18c8f36cfe444e519c94f2dc3231355`;

  // $('#search-input').keypress(function (e) {
  //   var key = e.which;
  //   if(key == 13)  // the enter key code
  //    {
  //       $('#btn').click();
  //       return false;
  //    }
  //  });   
   

  fetch(geoRequestURL)
    .then(async function (response) {
      const data= await response.json();
   
      console.log(data);
  
      console.log(data); 
      const lat = data[0].lat;
      const lon = data[0].lon;

      console.log("lat and lon", lat, lon);
        oneCall(lat, lon)    
  })

    });





//render data to the page
