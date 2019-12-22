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
        // update temp
        var row3 = $(".weatherCard")[i]
        var weatherTemp = $(row3).find(".temperature")
        weatherTemp.text(obj.main.temp + String.fromCharCode(176) + "F")
        // update humidity 
        var row4 = $(".weatherCard")[i]
        var weatherHumi = $(row4).find(".humidity")
        weatherHumi.text(obj.main.humidity + "(%)")
        // update windspeed 
        var row5 = $(".weatherCard")[i]
        var windSpeed = $(row5).find(".wind-speed")
        windSpeed.text(obj.wind.speed)



      });
    });
});

// for testing purposes
var imagesArray = [
    {
        day: 'one',
        item1: 'rain hat',
        item2: 'jacket',
        item3: 'umbrella',
        clothingIdOne: 'one',
        buttonIdOne: 'addItemBtn',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: 'two',
        item1: 'skirt',
        item2: 'sunglasses',
        item3: 'sunscreen',
        clothingIdOne: 'one',
        buttonIdOne: 'addItemBtn',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: 'two',
        item1: 'skirt',
        item2: 'sunglasses',
        item3: 'sunscreen',
        clothingIdOne: 'one',
        buttonIdOne: 'addItemBtn',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: 'two',
        item1: 'skirt',
        item2: 'sunglasses',
        item3: 'sunscreen',
        clothingIdOne: 'one',
        buttonIdOne: 'addItemBtn',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },

];
//

// our api keys since we're limited to 40 searches a day
var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk';
var mKey = 'AIzaSyCyMzjCk1NJKk98njdfK2nPf71XW7dpMM0';
var nKey = '';

// our cx codes because we're limited to 40 searches a day
var cxS = "013593235633977075550:az7kxqzno6z";
var cxC = '007241596936031581208:qzqpad7wyv5';
var cxM = "009075084732258994516:lralsp7otlc";


// for each function that will go object by object in out imagesArray
$('#getCltothingBtn').on('click', function () {
    imagesArray.forEach(function (element) {

        var query = "https://www.googleapis.com/customsearch/v1?key=" +
        cKey + "&cx=" + cxC + "&searchType=image&q=";

        // first ajax call, this goes over the element.item1 for each object
        $.ajax({ url: query + element.item1, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult1 = response.items[0].image.thumbnailLink
            element.imageName1 = response.queries.request[0].searchTerms

        });
        // second ajax call, this goes over the element.item2 for each object
        $.ajax({ url: query + element.item2, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult2 = response.items[0].image.thumbnailLink
            element.imageName2 = response.queries.request[0].searchTerms

        });
        // third ajax call, this goes over the element.item3 for each object
        $.ajax({ url: query + element.item3, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult3 = response.items[0].image.thumbnailLink
            element.imageName3 = response.queries.request[0].searchTerms

        });
    })

    // we want to set a timeout function to give the ajax calls time to complete and write to array
    // if we don't it's possible the next forEach function would run before any information is stored
    setTimeout(function () {

        // next forEach function that calls imagesArray again
        // now that we stored the image src and image name in previous forEach
        // we can access to append to page as html
        imagesArray.forEach(function (element, i) {

            
            // setting the html using an template literal with ``
            // we'll call the imageArray and append to page for as many as we have results
            var newImage = /*html*/`
            <div class="clothing-card card p-4">
                <img id=${element.imageName1 + i} src="https://via.placeholder.com/150" >
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.imageName1}</p>
                     <a href="#" id="${element.buttonIdOne + i}">+</a>
                    </div>
            </div>
            <div class="clothing-card card p-4">
                <img id=${element.imageName2 + i} src="https://via.placeholder.com/150"  >
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.imageName2}</p>
                        <a href="#" id="${element.buttonIdOne + i}">+</a>
                    </div>
            </div>
            <div class="clothing-card card p-4">
                    <img id=${element.imageName3 + i} src="https://via.placeholder.com/150" >
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.imageName3}</p>
                        <a href="#" id="${element.buttonIdOne + i}">+</a>
                    </div>
            </div>
        `
            // we append to page
            $('.wrapper').append(newImage)
        })
    }, 2000)
})
