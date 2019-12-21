$("#searchBtn").on("click", function (e) {


  //  var location = $(".form-control").val();
  var location = "Richmond"

  console.log(location);
  // grabds the city the entered, after a submit button is made i can turn it into a onlick function

  var APIKey = "298a4f435bb40084f3affdac067f0650";
  
   var queryURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=298a4f435bb40084f3affdac067f0650&q=${location}`

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      



      var days = [0, 7, 15, 23, 31]
      var titles = ["Tonight", "Tomorrow", "Day Three", "Day Four", "Day Five"]
      for (var i = 0; i < days.length; i++) {

        var cityName = response.city.name;
        var temphigh = response.list[i].main.temp_max;
        var templow = response.list[i].main.temp_low;
        var windSpeed = response.list[i].wind.speed; 
        
      













      }
    })

});