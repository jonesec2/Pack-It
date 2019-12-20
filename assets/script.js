
//var ///////////
/////////////
var imagesArray = ['RainHat', 'RainBoots']
var imageNumber = [0,1]
///
///


function imageSearch() {
    for (var i = 0; i < imagesArray.length; i++) {
        var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
        var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk'
        var mKey = ''
        var nKey = ''

        var cxS = "013593235633977075550:az7kxqzno6z";
        var cxC = '007241596936031581208:qzqpad7wyv5';
        var queryURL = "https://www.googleapis.com/customsearch/v1?key=" +
            cKey + "&cx=" + cxC + "&searchType=image&q=" + imagesArray[i];
        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            console.log(imagesArray)
            console.log(imageNumber)
            var image = response.items[i].image.thumbnailLink
            console.log(image)
            var newImage = $('<div>')
            newImage.html(`
                <img src='${image}'>`)
            console.log(newImage)
            $('.image').append(newImage)
        })
    }
}
imageSearch();