var imagesArray = [
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null },
    { date: null, item1: null, item2: null, item3: null }
];

var weatherArr = [{ temp: null , description: null }, { temp: null , description: null }, { temp: null , description: null },
{ temp: null , description: null }, { temp: null , description: null }];

var index = 0;
imagesArray.forEach(function (element) {
    if (weatherArr[index].description.includes("rain")) {
        imagesArray.item1 = "umbrella"
    };
    index++;  
});

// queryURL = "https// ~ &q=" + element.item1;
    // $.ajax({ url: api_queryForecast, success: success_function3, method: "GET" });
    // var newDiv = $("<div>");
    // var clothingCard = $("<.div>").addClass("clothing-card card").attr("anything we can identify");
    // clothingCard.append(element.item1);
    // clothingCard.append(element.item2);
    // clothingCard.append(element.item3);