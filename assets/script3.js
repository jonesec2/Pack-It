var sKey = "AIzaSyAChTnaHTlKPUC9c4Wl5B-asTQYREMD06o";
var cKey = 'AIzaSyDpswc8PHfmB1aXYmpbHnLB21FMC1eSYXk';
var mKey = 'AIzaSyCyMzjCk1NJKk98njdfK2nPf71XW7dpMM0';
var nKey = '';

var cxS = "013593235633977075550:az7kxqzno6z";
var cxC = '007241596936031581208:qzqpad7wyv5';
var cxM = "009075084732258994516:lralsp7otlc";


var imagesArray = [
    { 
        div: $("<div>").addClass("div1"), 
        item1: 'Hat',
        item2: 'Jacket', 
        item3: 'Snow Shoes', 
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
        div: $("<div>").addClass("div1"), 
        item1: 'Dress', 
        item2: 'Sunglasses', 
        item3: 'Flip-flops', 
        clothingIdOne: 'one', 
        buttonIdOne: 'addItemBtn', 
        imageResult1: null, 
        imageName1: null, 
        imageResult2: null, 
        imageName2: null, 
        imageResult3: null, 
        imageName3: null
    },
    // { div: $("<div>").addClass("div2"), item1: 'Umbrella', item2: 'rain jacket', item3: 'rain hat',clothingIdOne: 'one', buttonIdOne: 'addItemBtnOne', imagePicture1: null, imageName1: null, imageResult2: null, imageName2: null, imageResult3: null, imageName3: null }
    // { div: $("<div>").addClass("div3"), item1: null, item2: null, item3: null },
    // { div: $("<div>").addClass("div4"), item1: null, item2: null, item3: null },
    // { div: $("<div>").addClass("div5"), item1: null, item2: null, item3: null }
];
console.log(imagesArray.imageResult1)

imagesArray.forEach(function (element, i) {

    var query = "https://www.googleapis.com/customsearch/v1?key=" +
    mKey + "&cx=" + cxM + "&searchType=image&q=";

    $.ajax({ url: query + element.item1, method: "GET" }).then(function (response) {

        element.imageResult1 = response.items[0].image.thumbnailLink
        element.imageName1 = response.queries.request[0].searchTerms
        console.log(element.imageResult1)
        console.log(element.imageName1)


    });
    $.ajax({ url: query + element.item2, method: "GET" }).then(function (response) {
        

        element.imageResult2 = response.items[0].image.thumbnailLink
        element.imageName2 = response.queries.request[0].searchTerms

       
    });
    $.ajax({ url: query + element.item3, method: "GET" }).then(function (response) {
        console.log(response)
        element.imageResult3 = response.items[0].image.thumbnailLink
        element.imageName3 = response.queries.request[0].searchTerms

    });
})


setTimeout(function() {
    // console.log("log")

    imagesArray.forEach(function (element, i) {
        
        var newImage = $('<div>')
        newImage.html(`
        <div class="clothing-card card p-4">
            <img id=${element.imageName1 + i} src=${element.imageResult1}>
            <div class="d-flex justify-content-between pt-2">
                <p>${element.imageName1}</p>
                <a href="#" id="${element.buttonIdOne + i}">+</a>
            </div>
        </div>
        <div class="clothing-card card p-4">
            <img id=${element.imageName2 + i} src=${element.imageResult2}>
            <div class="d-flex justify-content-between pt-2">
                <p>${element.imageName2}</p>
                <a href="#" id="${element.buttonIdOne + i}">+</a>
            </div>
        </div>
        <div class="clothing-card card p-4">
            <img id=${element.imageName3 + i} src=${element.imageResult3}>
            <div class="d-flex justify-content-between pt-2">
                <p>${element.imageName3}</p>
                <a href="#" id="${element.buttonIdOne + i}">+</a>
            </div>
        </div>
        `)
        $('.wrapper').append(newImage)
    })
}, 2000 ) 


    // var newImage = $('<div>')
    // newImage.html(`
    // <div class="clothing-card card p-4">
    //     <img id=${element.clothingIdOne + i} src=${element.imageResult1}>
    //     <div class="d-flex justify-content-between pt-2">
    //         <p id="${element.imageName1}">${element.imageName1}</p>
    //         <a href="#" id="${element.buttonIdOne}">+</a>
    //     </div>
    // </div>
    // <div class="clothing-card card p-4">
    //     <img id=${element.clothingId} src=${element.imageResult2}>
    //     <div class="d-flex justify-content-between pt-2">
    //         <p id="${element.imageName2}">${element.imageName2}</p>
    //         <a href="#" id="${element.buttonId}">+</a>
    //     </div>
    // </div>
    // <div class="clothing-card card p-4">
    //     <img id=${element.clothingId} src=${element.imageResult3}>
    //     <div class="d-flex justify-content-between pt-2">
    //         <p id="${element.imageName3}">${element.imageName3}</p>
    //         <a href="#" id="${element.buttonId}">+</a>
    //     </div>
    // </div>
    //         `)
    // $('.wrapper').append(newImage)
    // // $(".wrapper").append(element.div);
// })

// var imageResults = [
//     { 
//         clothingIdOne: 'one', 
//     buttonIdOne: 'addItemBtnOne', 
//     imagePicture1: null, 
//     imageName1: null, 
//     imageResult2: null, 
//     imageName2: null, 
//     imageResult3: null, 
//     imageName3: null 
//     },
//     { 
//     clothingIdOne: 'two', 
//     buttonIdOne: 'addItemBtnTwo', 
//     imagePicture1: null, 
//     imageName1: null, 
//     imageResult2: null, 
//     imageName2: null, 
//     imageResult3: null, 
//     imageName3: null 
//     }
    // {imagePicture1: null, imageName1: null, imageResult2: null, imageName2:null, imageResult3: null, imageName3: null}
// ]

// imagesArray.forEach(function (element, i) {

   
// })
