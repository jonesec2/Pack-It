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
      // console.log(response);

      var fiveDayForecast = []

      response.list.forEach(function (obj, i) {
        if (i % 8 === 0) {
          fiveDayForecast.push(response.list[i + 5])
        }
      })

      fiveDayForecast.forEach(function (obj, i) {
        var row = $(".weatherCard")[i]
        // update date to corresponding weatherCard
        var weatherDate = $(row).find(".date")
        weatherDate.text(obj.dt_txt.split(" ")[0])
          console.log(obj)
        // update icon, temp, humidity, and windspeed to corresponding weatherCard
        var row2 = $(".weatherCard")[i]
        var weatherIcon = $(row2).find(".weather-icon")
        weatherIcon.attr("src", `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`)



      });





















    });
});