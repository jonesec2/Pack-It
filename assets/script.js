// date: response.list.dt
// temp: response.main.temp
// condition: response.weather[0].id

var imagesArray = [
    {
        date: null,
        item1: null,
        item2: null,
        item3: null,
        buttonIdOne: 'addItemBtn',
        clothingIdOne: 'one',
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
        buttonIdOne: 'addItemBtn',
        clothingIdOne: 'one',
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
        buttonIdOne: 'addItemBtn',
        clothingIdOne: 'one',
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
        buttonIdOne: 'addItemBtn',
        clothingIdOne: 'one',
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
        buttonIdOne: 'addItemBtn',
        clothingIdOne: 'one',
        imageResult1: null,
        imageName1: null,
        imageResult2: null,
        imageName2: null,
        imageResult3: null,
        imageName3: null
    }
];


var rain = ["Rainboots", "Rainpancho", "Umbrella", "Galoshes", "Rain Pants"];

var snow = ["Snow Boots", "Snow Jackets", "Snow Gloves"];

var generalHot = ["Short Sleeve Top", "Short Pants", "Water Bottle", "Light-Colored Clothing", "Lightweight Hat", "Walking Shoes", "Tote", "Tunic", "Hand Sanitizer", "V-Neck Shirt", "Quick Drying Shorts", "Lightweight Trail Runners", "Dry Fit Shirts", "Travel Towel", "Stretch T-Shirt"];
var generalMild = ["Long-Sleeved T-Shirt", "Jeans", "Long Sleeve Blouse", "Straight Pants", "Lightweight Hat", "Walking Shoes", "Tote", "Tunic", "Light Cardigan", "Button Down Shirt", "V-Neck Shirt", "Quick Drying Shorts", "Travel Pants", "Lightweight Trail Runners", "Dry Fit Shirts", "Travel Towel", "Stretch T-Shirt"];
var generalChilly = ["Trench Coat", "Muffler Scarf", "Silk Scarf", "Plaid Coat", "Denim Shirt", "Cardigan", "Fleece Pullover", "Long Sleeve Crew" ,"Wool Clothing", "Travel Pants", "Travel Jeans", "Lightweight Trail Runners", "Ultra-Light Jackets", "Fleece Jacket", "Flannel Shirt", "Packable Down Jacket"];
var generalCold = ["Sweater", "Down Jacket", "Cashmere Scarf", "Puffer Coat", "Scarves", "Wool Clothing", "Travel Pants", "Travel Jeans", "Ultra-Light Jackets", "Warm Hat", "Thermals", "Wool Socks", "Flannel Shirt", "Warm Lounge Pants", "Fleece Pullover", "Fleece Jacket"];

var sunnyHot = ["Sunscreen", "Straw Hat", "Sunglasses", "Flip Flops", "Sandals", "Snorkel Mask", "Water Shoes", "Swim Shirt", "Upf Top", "Linen Pants"];
var sunnyMild = ["Sunscreen", "Sunglasses", "Water Bottle", "Light-Colored Clothing", "Swim Shirt", "Bandana", "Quick Drying Pants", "Linen Pants", "Upf Top", "Swap Pants"];

var weatherArray = [{ date: "GH rain", temp: 82, condition: 210 }, { date: "GM rain", temp: 72, condition: 312 },
{ date: "GCold snow", temp: 20, condition: 600 }, { date: "GChilly clouds", temp: 62, condition: 751 }, { date: "SM clear", temp: 72, condition: 800 }];

var index = 0;
imagesArray.forEach(function (element) {
    // Group 2xx: Thunderstorm, Group 3xx: Drizzle, Group 5xx: Rain
    if (weatherArray[index].condition >= 200 && weatherArray[index].condition <= 531) {
        element.item1 = rain[Math.floor(Math.random() * rain.length)];
        if (weatherArray[index].temp >= 78) {
            var random1 = Math.floor(Math.random() * generalHot.length);
            element.item2 = generalHot[random1];
            generalHot.splice(random1, 1);

            var random2 = Math.floor(Math.random() * generalHot.length);
            element.item3 = generalHot[random2];
            generalHot.splice(random2, 1);
        }
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) {
            var random1 = Math.floor(Math.random() * generalMild.length);
            element.item2 = generalMild[random1];
            generalMild.splice(random1, 1);

            var random2 = Math.floor(Math.random() * generalMild.length);
            element.item3 = generalMild[random2];
            generalMild.splice(random2, 1);
        }
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) {
            var random1 = Math.floor(Math.random() * generalChilly.length);
            element.item2 = generalChilly[random1];
            generalChilly.splice(random1, 1);

            var random2 = Math.floor(Math.random() * generalChilly.length);
            element.item3 = generalChilly[random2];
            generalChilly.splice(random2, 1);
        }
        if (weatherArray[index].temp < 50) {
            var random1 = Math.floor(Math.random() * generalCold.length);
            element.item2 = generalCold[random1];
            generalCold.splice(random1, 1);

            var random2 = Math.floor(Math.random() * generalCold.length);
            element.item3 = generalCold[random2];
            generalCold.splice(random2, 1);
        }
    }

    // Group 6xx: Snow
    else if (weatherArray[index].condition >= 600 && weatherArray[index].condition <= 622) {
        element.item1 = snow[Math.floor(Math.random() * snow.length)];

        var random1 = Math.floor(Math.random() * generalCold.length);
        element.item2 = generalCold[random1];
        generalCold.splice(random1, 1);

        var random2 = Math.floor(Math.random() * generalCold.length);
        element.item3 = generalCold[random2];
        generalCold.splice(random2, 1);
    }

    // Group 7xx: Atmosphere, Group 8xx: Clouds
    else if (weatherArray[index].condition >= 700 && weatherArray[index].condition <= 781
        || weatherArray[index].condition >= 801 && weatherArray[index].condition <= 804) {

        if (weatherArray[index].temp >= 78) {
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
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) {
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
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) {
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
        if (weatherArray[index].temp < 50) {
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
        if (weatherArray[index].temp >= 78) {
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
        if (weatherArray[index].temp < 78 && weatherArray[index].temp >= 70) {
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
        if (weatherArray[index].temp < 70 && weatherArray[index].temp >= 50) {
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
        if (weatherArray[index].temp < 50) {
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
    index++;
});

console.log(weatherArray)
console.log(imagesArray)