//var ///////////
/////////////
// var imagesArray = ['RainHat', 'RainBoots']
var imageNumber = [0, 1]
///
///
var imagesArray = [
    { day: 'one', item1: 'rain hat', item2: 'jacket', item3: 'umbrella' },
    { day: 'two', item1: 'skirt', item2: 'sunglasses', item3: 'sunscreen' }
//     { date: null, item1: null, item2: null, item3: null },
//     { date: null, item1: null, item2: null, item3: null },
//     { date: null, item1: null, item2: null, item3: null }
];
// console.log(imagesArray)



for (var i = 0; i < imagesArray.length; i++) {
    function imageSearch() {
        var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
        var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk';
        var mKey = '';
        var nKey = '';

        var cxS = "013593235633977075550:az7kxqzno6z";
        var cxC = '007241596936031581208:qzqpad7wyv5';

        var item1 = "https://www.googleapis.com/customsearch/v1?key=" +
            cKey + "&cx=" + cxC + "&searchType=image&q=" + imagesArray[i].item1;

        var item2 = "https://www.googleapis.com/customsearch/v1?key=" +
            cKey + "&cx=" + cxC + "&searchType=image&q=" + imagesArray[i].item2;

        var item3 = "https://www.googleapis.com/customsearch/v1?key=" +
            cKey + "&cx=" + cxC + "&searchType=image&q=" + imagesArray[i].item3;


        $.ajax({
            url: item1,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var clothingName = response.queries.request[0].searchTerms
            // var clothingNameTwo = response.queries.request[0].searchTerms
            // console.log(clothingName)

            var image = response.items[0].image.thumbnailLink
            console.log(image)

            $('#clothing1').attr("src", image)
            $('#clothing1Name').text(clothingName)
        })
        $.ajax({
            url: item2,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var clothingName = response.queries.request[0].searchTerms
            // var clothingNameTwo = response.queries.request[0].searchTerms
            // console.log(clothingName)

            var image = response.items[0].image.thumbnailLink
            console.log(image)

            $('#clothing2').attr("src", image)
            $('#clothing2Name').text(clothingName)
        })
        $.ajax({
            url: item3,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var clothingName = response.queries.request[0].searchTerms
            // var clothingNameTwo = response.queries.request[0].searchTerms
            // console.log(clothingName)

            var image = response.items[0].image.thumbnailLink
            console.log(image)

            $('#clothing3').attr("src", image)
            $('#clothing3Name').text(clothingName)
        })
    }
}
imageSearch();