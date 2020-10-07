
var currentDayEl = document.getElementById('day');
var day1 = document.getElementById('date1');
var day2 = document.getElementById('date2');
var day3 = document.getElementById('date3');
var day4 = document.getElementById('date4');
var day5 = document.getElementById('date5');

//dates for weather
var displayDay= moment().format('L');
console.log(displayDay);
currentDayEl.textContent = displayDay;
//5 day forecast
var weekDay1 = moment().add(1, 'days').format('L');
day1.textContent = weekDay1;

var weekDay2= moment().add(2, 'days').format('L');
day2.textContent= weekDay2;

var weekDay3 = moment().add(3, 'days').format('L');
day3.textContent = weekDay3;

var weekDay4 = moment().add(4, 'days').format('L');
day4.textContent = weekDay4;

var weekDay5 = moment().add(5, 'days').format('L');
day5.textContent = weekDay5;

// $(".btn").on("click", function(event) {
//     event.preventDefault();
//     console.log("hi");
//     var city = $(".form-control")
//     .val()
//     .trim();
//     // cityList.push(city);
    // localStorage.setItem('citylist', JSON.stringify(city));
// });
var list = JSON.parse(localStorage.getItem('citylist')) || [];
// lists cities on the page
var cityDisplay = function() {
    // empties html
    $("#cities").empty();

    
// iterates over the list
for (var i = 0; i < list.length; i++) {
    //create new var to hold the p tag
    var searchCity = $('<p>');
    searchCity.text(list[i]);
    console.log("hello");

    //adds city to the list
    $("#cities").append(searchCity);
    console.log("hi");

$('.btn').on("click", function(event) {
    event.preventDefault();
    console.log("btn");
    //get city value and store as var
    var city = $(".form-control")
        .val()
        .trim();
    //add new city to list
    list.push(city);
    //update list on page
    cityDisplay(list);

    //save city in local storage
    localStorage.setItem("cities", JSON.stringify(list));

    //clear search box
    $("search").val('');

// // iterates over the list
// for (var i = 0; i < list.length; i++) {
//     //create new var to hold the p tag
//     var searchCity = $('<p>');
//     searchCity.text(list[i]);
//     console.log("hello");

//     //adds city to the list
//     $("#cities").append(searchCity);
//     console.log("hi");
//     };
});
};
}
cityDisplay()


//console log to find display issue
//link api for weather information
