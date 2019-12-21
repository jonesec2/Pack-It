
//var ///////////
/////////////
// var imagesArray = ['RainHat', 'RainBoots']
var imageNumber = [0, 1]
///
///
var imagesArray = [
    { day: 'one', item1: 'rain hat', item2: 'jacket', item3: 'umbrella' },
    { date: 'two', item1: 'skirt', item2: 'sunglasses', item3: 'sunscreen' }
    // { date: null, item1: null, item2: null, item3: null },
    // { date: null, item1: null, item2: null, item3: null },
    // { date: null, item1: null, item2: null, item3: null }
];
console.log(imagesArray)
// var wrapperArray = ['wrapperOne', 'wrapperTwo']

function imageSearch() {
    for (var i = 0; i < imagesArray.length; i++) {
        var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
        var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk'
        var mKey = ''
        var nKey = ''

        var cxS = "013593235633977075550:az7kxqzno6z";
        var cxC = '007241596936031581208:qzqpad7wyv5';
        var queryURL = "https://www.googleapis.com/customsearch/v1?key=" +
            cKey + "&cx=" + cxC + "&searchType=image&q=" + imagesArray[i].item1;
        console.log(queryURL)
        console.log(imagesArray[i].item1)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            // console.log(imagesArray)
            // console.log(imagesArray[0].item1)
            // console.log(imagesArray[1].item1)
            // console.log(imageNumber)
            var clothingName = response.queries.request[0].searchTerms
            // var clothingNameTwo = response.queries.request[0].searchTerms
            // console.log(clothingName)

            var image = response.items[i].image.thumbnailLink
            console.log(image)



            // var imageTwo = response.items[1].image.thumbnailLink
            // console.log(imageTwo)

            var newImage = $('<div>')
            newImage.html(/*html*/`
            <div class="wrapper container d-flex flex-column flex-sm-row">
                <div class="clothing-card card p-4">
                    <img id=clothing1 src=${image}>
                    <div class="d-flex justify-content-between pt-2">
                        <p id="clothing1Name">${clothingName}</p>
                        <a href="#" id="addItemBtn">+</a>
                    </div>
                </div>
            </div>`)
            console.log(newImage)
            $('.suggestion-header').append(newImage)



            $('#clothing1').attr("src", image)
            // // $('#clothing2').attr("src", imageTwo)
            // $('#clothingName1').each(function (){
            //     this.text(clothingName)
            // })
            // $('#clothing1Name').text(clothingNameTwo)
        })
    }
}
imageSearch();