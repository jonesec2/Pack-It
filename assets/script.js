// date: response.list.dt
// temp: response.main.temp
// condition: response.weather[0].id
var weatherArray = [{date: "", temp: 82, condition: 210 }, {date: "", temp: 72, condition: 312 }, {date: "", temp: 20, condition: 600 },
{date: "", temp: 62, condition: 751 }, {date: "", temp: 89, condition: 800 }];

var imagesArray = [
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null }
];

var index = 0;
imagesArray.forEach(function (element) {
    // Group 2xx: Thunderstorm, Group 3xx: Drizzle, Group 5xx: Rain
    if (weatherArray[index].condition >= 200 && weatherArray[index].condition <= 531) {
        element.item1 = "umbrella";
        element.item2 = "rainboots";
        if (weatherArray[index].temp >= 78) { element.item3 = "rainpancho" }
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) { element.item3 = "rainpancho" }
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) { element.item3 = "raincoat" }
        if (weatherArray[index].temp < 50) { element.item3 = "raincoat" }
    }

    // Group 6xx: Snow
    else if (weatherArray[index].condition >= 600 && weatherArray[index].condition <= 622) {
        element.item1 = "snow boots";
        element.item2 = "snow jackets";
        element.item3 = "snow gloves";
    }

    // Group 7xx: Atmosphere, Group 8xx: Clouds
    else if (weatherArray[index].condition >= 700 && weatherArray[index].condition <= 781
        || weatherArray[index].condition >= 801 && weatherArray[index].condition <= 804) {
        element.item1 = "sneakers";
        if (weatherArray[index].temp >= 78) {
            element.item2 = "short sleeve top";
            element.item3 = "short pants";
        }
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) {
            element.item2 = "long-sleeved t-shirt";
            element.item3 = "jeans";
        }
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) {
            element.item2 = "trench coat";
            element.item3 = "muffler scarf";
        }
        if (weatherArray[index].temp < 50) {
            element.item2 = "sweater";
            element.item3 = "down jacket";
        }
    }

    // Group 800: Clear
    else {
        element.item1 = "sunglasses";
        if (weatherArray[index].temp >= 78) {
            element.item2 = "straw hat";
            element.item3 = "flip flops";
        }
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) {
            element.item2 = "long sleeve blouse";
            element.item3 = "straight pants";
        }
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) {
            element.item2 = "silk scarf";
            element.item3 = "plaid coat";
        }
        if (weatherArray[index].temp < 50) {
            element.item2 = "cashmere scarf";
            element.item3 = "puffer coat";
        }
    }
    index++;
});

console.log(imagesArray)