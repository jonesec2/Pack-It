// Create empty object for saved items to be locally stored
var savedItems = [];

// Weather data array to generate keywords for image search
var weatherArray = [{ temp: null, condition: null }, { temp: null, condition: null },
{ temp: null, condition: null }, { temp: null, condition: null }, { temp: null, condition: null }];

$(document).ready(function () {
    function init() {

        // Get stored savedItems from localStorage
        storedSavedItems = JSON.parse(localStorage.getItem("savedItems"));

        // If savedItems were retrieved from localStorage, update the savedItems object to it
        if (storedSavedItems !== null) {
            savedItems = storedSavedItems;
        }

        displayToSuitcase();

    }
    init();
});


// Display selected clothing items to suitcase page
function displayToSuitcase() {
    // Clear page of cards before updated cards are displayed (to avoid duplicates)
    $("#suitcasePage .wrapper").empty();
    $.each(savedItems, function (key, value) {
        var newSuitcaseItem = /*html*/`
        <div class="clothing-card card">
            <img src="${value[1]}">
                <div class="d-flex justify-content-between pt-2">
                    <p class="clothing-name">${value[0]}</p>
                <a href="#">x</a>
                </div>
        </div>`

        $("#suitcasePage .wrapper").append(newSuitcaseItem);
    });

    // Give each suitcase card a unique data-button-number to know which to remove later
    $("#suitcasePage .clothing-card").map(function (i) {
        $(this).attr("data-card-number", i);
    })
}


// When a remove button inside of a card is clicked...
$("#suitcasePage .wrapper").on("click", function (event) {
    // Prevent link click from redirecting to top of page
    event.preventDefault();

    var element = event.target;

    if (element.matches("a") === true) {
        console.log("working");
        // Get its data-card-number value and remove the item from the suitcase page
        var index = $(element).parents(".clothing-card").attr("data-card-number");
        console.log(index);
        console.log(savedItems);
        savedItems.splice(index, 1);

        // Store updated items in localStorage, re-render the cards to suitcase page
        localStorage.setItem("savedItems", JSON.stringify(savedItems));
        displayToSuitcase();
    }
});

// creating object to store local weather data

var citweather = localStorage.getItem("cit-name");

// If a user presses enter, do the same thing as clicking city weather button (Seohui)
$(".form-control").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        $("#searchBtn").click();
        return false;
    }
});

// city weather button
$("#searchBtn").on("click", function (e) {

    // empties out old city name
    $('#cityName').empty();

    // Empties suggested items generated from previous search (Seohui)
    $('#suggestedItems').empty();

    // grabs city name from text input area
    var location = $(".form-control").val();
    location = location.charAt(0).toUpperCase() + location.substring(1).toLowerCase();

    // sets city-name = to user type
    $('#cityName').text(location)

    console.log(location);
    //setting city into local storage
    localStorage.setItem("cit-name", (location));


    console.log(location);

    // var APIKey = "298a4f435bb40084f3affdac067f0650";

    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=298a4f435bb40084f3affdac067f0650&q=${location}`

    $.ajax({
        url: queryURL,
        method: "GET",
        success: weatherCall,
        error: weatherError
    });

    function weatherCall(response) {
        // console.log(response);
        //displays the weather container on search
        $("#weatherContainer").css("display", "block");

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

            // update icon, temp, humidity, and wind speed to corresponding weatherCard
            var row2 = $(".weatherCard")[i]
            var weatherIcon = $(row2).find(".weather-icon")
            weatherIcon.attr("src", `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`)
            // update temp
            var row3 = $(".weatherCard")[i]
            var weatherTemp = $(row3).find(".temperature")
            weatherTemp.text(obj.main.temp + " " + String.fromCharCode(176) + "F")
            // update humidity 
            var row4 = $(".weatherCard")[i]
            var weatherHumi = $(row4).find(".humidity")
            weatherHumi.text(obj.main.humidity + "%")
            // update wind speed 
            var row5 = $(".weatherCard")[i]
            var windSpeed = $(row5).find(".wind-speed")
            windSpeed.text(obj.wind.speed)
            $(".wind-speed").addClass("fa fa-flag")

            // Connecting weather API data to keywords generated in terms of weather conditions
            imagesArray[i].date = obj.dt_txt.split(" ")[0];
            weatherArray[i].temp = obj.main.temp;
            weatherArray[i].condition = obj.weather[0].id;
        });

        // It would run a function that will update items in imagesArray
        suggestItems();

        // Once the city weather button is clicked, it will display get-clothing-options button
        $("#getClothingBtn").css("display", "block");

        console.log(weatherArray);
    };

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "2000",
        "hideDuration": "2000",
        "timeOut": "4000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    function weatherError() {
        toastr.error("We couldn't find your city, check the spelling or whether this place actually exists.", 'Error!')
    }
});

// weather from local storage + second api
$(document).ready(function () {

    if (citweather !== null) {

        var APIKey = "298a4f435bb40084f3affdac067f0650";

        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=298a4f435bb40084f3affdac067f0650&q=${citweather}`

        $.ajax({
            url: queryURL,
            method: "GET",
            success: weatherCall,
            error: weatherError
        });

        function weatherCall(response) {

            $("#getClothingBtn").css("display", "block");
            $("#weatherContainer").css("display", "block");

            var fiveDayForecast = []

            $('#cityName').append(citweather)

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
                // update icon, temp, humidity, and wind speed to corresponding weatherCard
                var row2 = $(".weatherCard")[i]
                var weatherIcon = $(row2).find(".weather-icon")
                weatherIcon.attr("src", `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`)
                // update temp
                var row3 = $(".weatherCard")[i]
                var weatherTemp = $(row3).find(".temperature")
                weatherTemp.text(obj.main.temp + " " + String.fromCharCode(176) + "F")
                // update humidity 
                var row4 = $(".weatherCard")[i]
                var weatherHumi = $(row4).find(".humidity")
                weatherHumi.text(obj.main.humidity + "%")
                // update windspeed 
                var row5 = $(".weatherCard")[i]
                var windSpeed = $(row5).find(".wind-speed")
                windSpeed.text(obj.wind.speed)

                // Connecting weather API data to keywords generated in terms of weather conditions
                imagesArray[i].date = obj.dt_txt.split(" ")[0];
                weatherArray[i].temp = obj.main.temp;
                weatherArray[i].condition = obj.weather[0].id;
            });

            // It would run a function that will update items in imagesArray
            suggestItems();
        };
    }

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "2000",
        "hideDuration": "2000",
        "timeOut": "4000",
        "extendedTimeOut": "2000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    function weatherError() {
        toastr.error("We couldn't find your last saved search, check the spelling or whether this place actually exists.", 'Uh oh...')
    }
})

var imagesArray = [
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'AddItem',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'AddItem',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'AddItem',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'AddItem',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    },
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'AddItem',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    }
];
console.log(imagesArray)

function suggestItems() {
    var rain = ["Rain Boots", "Rain Pancho", "Umbrella", "Galoshes", "Rain Pants"];

    var snow = ["Snow Boots", "Snow Jackets", "Snow Gloves", "Snow Pants", "Snow Hat"];

    var generalHot = ["Short Sleeve Top", "Short Pants", "Water Bottle", "Light-Colored Clothing", "Lightweight Hat", "Walking Shoes", "Tote", "Tunic", "Hand Sanitizer", "V-Neck Shirt", "Quick Drying Shorts", "Lightweight Trail Runners", "Dry Fit Shirts", "Travel Towel", "Stretch T-Shirt"];
    var generalMild = ["Long-Sleeved T-Shirt", "Jeans", "Long Sleeve Blouse", "Straight Pants", "Lightweight Hat", "Walking Shoes", "Tote", "Tunic", "Light Cardigan", "Button Down Shirt", "V-Neck Shirt", "Quick Drying Shorts", "Travel Pants", "Lightweight Trail Runners", "Dry Fit Shirts", "Travel Towel", "Stretch T-Shirt"];
    var generalChilly = ["Trench Coat", "Muffler Scarf", "Silk Scarf", "Plaid Coat", "Denim Shirt", "Cardigan", "Fleece Pullover", "Long Sleeve Crew", "Wide-Leg Pants", "Beanie", "Travel Jeans", "Lightweight Trail Runners", "Ultra-Light Jackets", "Fleece Jacket", "Flannel Shirt", "Packable Down Jacket"];
    var generalCold = ["Sweater", "Down Jacket", "Cashmere Scarf", "Puffer Coat", "Scarves", "Turtleneck", "Thermal Shirt", "Wool Varsity Jacket", "Ultra-Light Jackets", "Warm Hat", "Down Pullover", "Wool Socks", "Flannel Shirt", "Warm Lounge Pants", "Fleece Pullover", "Fleece Jacket", "Loose Jeans"];

    var sunnyHot = ["Sunscreen", "Straw Hat", "Sunglasses", "Flip Flops", "Sandals", "Snorkel Mask", "Water Shoes", "Swim Shirt", "Upf Top", "Linen Pants"];
    var sunnyMild = ["Sunscreen", "Sunglasses", "Water Bottle", "Light-Colored Clothing", "Swim Shirt", "Bandana", "Quick Drying Pants", "Linen Pants", "Upf Top", "Swap Pants"];

    imagesArray.forEach(function (element, i) {
        // Group 2xx: Thunderstorm, Group 3xx: Drizzle, Group 5xx: Rain
        if (weatherArray[i].condition >= 200 && weatherArray[i].condition <= 531) {
            var random = Math.floor(Math.random() * rain.length);
            element.item1 = rain[random];
            rain.splice(random, 1);

            if (weatherArray[i].temp >= 78) {
                var random1 = Math.floor(Math.random() * generalHot.length);
                element.item2 = generalHot[random1];
                generalHot.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalHot.length);
                element.item3 = generalHot[random2];
                generalHot.splice(random2, 1);
            }
            if (weatherArray[i].temp < 78 && weatherArray[i].temp >= 70) {
                var random1 = Math.floor(Math.random() * generalMild.length);
                element.item2 = generalMild[random1];
                generalMild.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalMild.length);
                element.item3 = generalMild[random2];
                generalMild.splice(random2, 1);
            }
            if (weatherArray[i].temp < 70 && weatherArray[i].temp >= 50) {
                var random1 = Math.floor(Math.random() * generalChilly.length);
                element.item2 = generalChilly[random1];
                generalChilly.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalChilly.length);
                element.item3 = generalChilly[random2];
                generalChilly.splice(random2, 1);
            }
            if (weatherArray[i].temp < 50) {
                var random1 = Math.floor(Math.random() * generalCold.length);
                element.item2 = generalCold[random1];
                generalCold.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalCold.length);
                element.item3 = generalCold[random2];
                generalCold.splice(random2, 1);
            }
        }

        // Group 6xx: Snow
        else if (weatherArray[i].condition >= 600 && weatherArray[i].condition <= 622) {
            var random = Math.floor(Math.random() * snow.length);
            element.item1 = snow[random];
            snow.splice(random, 1);

            var random1 = Math.floor(Math.random() * generalCold.length);
            element.item2 = generalCold[random1];
            generalCold.splice(random1, 1);

            var random2 = Math.floor(Math.random() * generalCold.length);
            element.item3 = generalCold[random2];
            generalCold.splice(random2, 1);
        }

        // Group 7xx: Atmosphere, Group 8xx: Clouds
        else if (weatherArray[i].condition >= 700 && weatherArray[i].condition <= 781
            || weatherArray[i].condition >= 801 && weatherArray[i].condition <= 804) {

            if (weatherArray[i].temp >= 78) {
                var random1 = Math.floor(Math.random() * generalHot.length);
                element.item1 = generalHot[random1];
                generalHot.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalHot.length);
                element.item2 = generalHot[random2];
                generalHot.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalHot.length);
                element.item3 = generalHot[random3];
                generalHot.splice(random3, 1);
            }
            if (weatherArray[i].temp < 78 && weatherArray[i].temp >= 70) {
                var random1 = Math.floor(Math.random() * generalMild.length);
                element.item1 = generalMild[random1];
                generalMild.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalMild.length);
                element.item2 = generalMild[random2];
                generalMild.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalMild.length);
                element.item3 = generalMild[random3];
                generalMild.splice(random3, 1);
            }
            if (weatherArray[i].temp < 70 && weatherArray[i].temp >= 50) {
                var random1 = Math.floor(Math.random() * generalChilly.length);
                element.item1 = generalChilly[random1];
                generalChilly.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalChilly.length);
                element.item2 = generalChilly[random2];
                generalChilly.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalChilly.length);
                element.item3 = generalChilly[random3];
                generalChilly.splice(random3, 1);
            }
            if (weatherArray[i].temp < 50) {
                var random1 = Math.floor(Math.random() * generalCold.length);
                element.item1 = generalCold[random1];
                generalCold.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalCold.length);
                element.item2 = generalCold[random2];
                generalCold.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalCold.length);
                element.item3 = generalCold[random3];
                generalCold.splice(random3, 1);
            }
        }

        // Group 800: Clear
        else {
            if (weatherArray[i].temp >= 78) {
                var random1 = Math.floor(Math.random() * sunnyHot.length);
                element.item1 = sunnyHot[random1];
                sunnyHot.splice(random1, 1);

                var random2 = Math.floor(Math.random() * sunnyHot.length);
                element.item2 = sunnyHot[random2];
                sunnyHot.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalHot.length);
                element.item3 = generalHot[random3];
                generalHot.splice(random3, 1);
            }
            if (weatherArray[i].temp < 78 && weatherArray[i].temp >= 70) {
                var random1 = Math.floor(Math.random() * sunnyMild.length);
                element.item1 = sunnyMild[random1];
                sunnyMild.splice(random1, 1);

                var random2 = Math.floor(Math.random() * sunnyMild.length);
                element.item2 = sunnyMild[random2];
                sunnyMild.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalMild.length);
                element.item3 = generalMild[random3];
                generalMild.splice(random3, 1);

            }
            if (weatherArray[i].temp < 70 && weatherArray[i].temp >= 50) {
                var random1 = Math.floor(Math.random() * generalChilly.length);
                element.item1 = generalChilly[random1];
                generalChilly.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalChilly.length);
                element.item2 = generalChilly[random2];
                generalChilly.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalChilly.length);
                element.item3 = generalChilly[random3];
                generalChilly.splice(random3, 1);
            }
            if (weatherArray[i].temp < 50) {
                var random1 = Math.floor(Math.random() * generalCold.length);
                element.item1 = generalCold[random1];
                generalCold.splice(random1, 1);

                var random2 = Math.floor(Math.random() * generalCold.length);
                element.item2 = generalCold[random2];
                generalCold.splice(random2, 1);

                var random3 = Math.floor(Math.random() * generalCold.length);
                element.item3 = generalCold[random3];
                generalCold.splice(random3, 1);
            }

        }
        console.log(imagesArray)
    });

    console.log(imagesArray);
}

// our api keys since we're limited to 40 searches a day
var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk';
var mKey = 'AIzaSyCyMzjCk1NJKk98njdfK2nPf71XW7dpMM0';
var jKey = 'AIzaSyCw1cGHJs4uVea7a9g3VyMJrfAV9_VVV8k';

// our cx codes because we're limited to 40 searches a day
var cxS = "013593235633977075550:az7kxqzno6z";
var cxC = '007241596936031581208:qzqpad7wyv5';
var cxM = "009075084732258994516:lralsp7otlc";
var cxJ = "006909077347969630804:48vbvnkdqu9";


// for each function that will go object by object in our imagesArray
$('#getClothingBtn').on('click', function () {

    $('#suggestedItems').empty();

    var suggestedItems = /*html*/`
    <h2 class="suggestion-header w-100 mb-4 text-center">Suggested Items</h2>
        <div id="loader"></div>
        <div class="wrapper">

        </div>
    `

    var loadIcon = /*html*/`
    <div class="icon"></div>
    `
    $('#suggestedItems').append(suggestedItems)
    $('#loader').append(loadIcon)

    // empties out old search results
    $('.wrapper').empty();


    imagesArray.forEach(function (element) {

        var query = "https://cors-anywhere.herokuapp.com/"+ "https://www.googleapis.com/customsearch/v1?key=" +
            jKey + "&cx=" + cxJ + "&searchType=image&q=" +  element.item1 + " 500x500";



        // first ajax call, this goes over the element.item1 for each object
        $.ajax({ url: query, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult1 = response.items[0].image.thumbnailLink
            element.imageName1 = response.queries.request[0].searchTerms

            console.log(element.imageName1 + ": " + element.imageResult1)

        });

        // second ajax call, this goes over the element.item2 for each object

        var queryTwo = "https://cors-anywhere.herokuapp.com/"+"https://www.googleapis.com/customsearch/v1?key=" +
            jKey + "&cx=" + cxJ + "&searchType=image&q=" + element.item2 + " 500x500";
        $.ajax({ url: queryTwo, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult2 = response.items[0].image.thumbnailLink
            element.imageName2 = response.queries.request[0].searchTerms

            console.log(element.imageName2 + ": " + element.imageResult2)

        });

        var queryThree = "https://cors-anywhere.herokuapp.com/"+"https://www.googleapis.com/customsearch/v1?key=" +
        jKey + "&cx=" + cxJ + "&searchType=image&q=" + element.item3 + " 500x500";
        // third ajax call, this goes over the element.item3 for each object
        $.ajax({ url: queryThree, method: "GET" }).then(function (response) {

            // we then store the results back into imagesArray
            element.imageResult3 = response.items[0].image.thumbnailLink
            element.imageName3 = response.queries.request[0].searchTerms

            console.log(element.imageName3 + ": " + element.imageResult3)

        });

        // ---------------------------------------------------------------------------------------------------

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
            
            <div class="clothing-card card">
                <img id="${element.item1 + i}" src="${element.imageResult1}" >
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.item1}</p>
                     <a href="#" id="${element.item1 + element.buttonIdOne + i}">+</a>
                    </div>
            </div>
            <div class="clothing-card card">
                <img id="${element.item2 + i}" src="${element.imageResult2}" >
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.item2}</p>
                        <a href="#" id="${element.item2 + element.buttonIdOne + i}">+</a>
                    </div>
            </div>
            <div class="clothing-card card">
                    <img id="${element.item3 + i}" src="${element.imageResult3}">
                    <div class="d-flex justify-content-between pt-2">
                        <p class="clothing-name">${element.item3}</p>
                        <a href="#" id="${element.item3 + element.buttonIdOne + i}">+</a>
                    </div>
            </div>
        `

            // we append to page
            $('.wrapper').append(newImage)
        })

        // remove loader after images load 
        $('#loader').empty();
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }


        function storeItems() {
            // Local storage
            $(".clothing-card div a").on("click", function (event) {

                toastr.success('Clothing added to your suitcase.', 'Success!')


                // Prevent link click from redirecting to top of page
                event.preventDefault();
                var imgURL = $(this).parents(".clothing-card").children("img").attr("src");
                var imgName = $(this).siblings(".clothing-name").text();
                var itemDataPair = [];
                itemDataPair[0] = imgName;
                itemDataPair[1] = imgURL;
                savedItems.push(itemDataPair);

                localStorage.setItem("savedItems", JSON.stringify(savedItems));
            });
        }
        storeItems();

    }, 2500)

});


