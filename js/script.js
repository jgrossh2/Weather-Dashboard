
var currentDayEl = document.getElementById('day');
var day1 = document.getElementById('date1');
var day2 = document.getElementById('date2');
var day3 = document.getElementById('date3');
var day4 = document.getElementById('date4');
var day5 = document.getElementById('date5');
var Temp1El = document.querySelector('.Temp1');
var Temp2El = document.querySelector('.Temp2');
var Temp3El = document.querySelector('.Temp3');
var Temp4El = document.querySelector('.Temp4');
var Temp5El = document.querySelector('.Temp5');
var icon1El= document.querySelector(".Icon1");
var icon2El = document.querySelector(".Icon2");
var icon3El = document.querySelector(".Icon3");
var icon4El = document.querySelector(".Icon4");
var icon5El = document.querySelector(".Icon5");
var Humid1El = document.querySelector('.Humid1');
var Humid2El = document.querySelector('.Humid2');
var Humid3El = document.querySelector('.Humid3');
var Humid4El = document.querySelector('.Humid4');
var Humid5El = document.querySelector('.Humid5');

//dates for weather
var displayDay= moment().format('L');
console.log(displayDay);
// currentDayEl.textContent = displayDay;
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

var list = JSON.parse(localStorage.getItem('citylist')) || [];
// lists cities on the page
var cityDisplay = function() {
    // empties html
    $("#cities").empty();
    clearIcon();

    // iterates over the list
    for (var i = 0; i < list.length; i++) {
        //create new var to hold the p tag
        var searchCity = $('<p>');
        searchCity.text(list[i]);
        console.log("hello");

        //adds city to the list
        $("#cities").append(searchCity);
        console.log("hi");
    }
};

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
    cityWeather(city);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=7d95de6a04331392bb18348d8a3c24c9';
    fetch (apiUrl) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var img = document.createElement('img');
        img.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        
    currentDayEl.innerHTML = city + " (" + displayDay + ") ";
    currentDayEl.appendChild(img);
    })
    
    //clear search box
    $(".form-control").val('');
    clearIcon();
    console.log("clear");
});
$("#cities").on("click", function(event) {
    event.preventDefault();
    console.log("works");
})
var clearIcon = function() {
    $(".Icon1").val('');
    $(".Icon2").val('');
    $(".Icon3").val('');
    $(".Icon4").val('');
    $(".Icon5").val('');
}
var cityWeather = function(city) {
    // $('.city').removeClass('city');
    // var citySearch  = document.querySelector(".form-control");
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=7d95de6a04331392bb18348d8a3c24c9';
    fetch (apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data, city);
        var tempEl = document.querySelector('#temp');
        tempEl.textContent = "Temperature: " + data.main.temp +"*F";
        var humidEl = document.querySelector('#humid');
        humidEl.textContent = "Humidity:" + data.main. humidity +"%";
        var windEl = document.querySelector('#wind');
        windEl.textContent = "Wind: " + data.wind.speed + "MPH";
        
        // var icon = data.weather[0].icon;
        // var iconDisplay = ;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var uvEl = document.querySelector('#uv');
        var apiUrlUv = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=7d95de6a04331392bb18348d8a3c24c9';
        fetch (apiUrlUv)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        var uv = data.value
        // uv.className("uvColor")
         uvEl.textContent = "UV Index: " + uv;
         if (uv > 7 || uv === 7) {
            $("#uv").addClass("bg-danger")
        } else if 
            (uv < 7 && uv > 4) {
            $("#uv").addClass("bg-warning");
        } else {
            $("#uv").addClass("bg-success");
        }
        });
        var upiForecast = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly,alerts&units=imperial&appid=7d95de6a04331392bb18348d8a3c24c9';
        fetch (upiForecast) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data, city)
            Temp1El.textContent = "Temperature: " + data.daily[0].temp.day + "*F";
            Temp2El.textContent = "Temperature: " + data.daily[1].temp.day + "*F";
            Temp3El.textContent = "Temperature: " + data.daily[2].temp.day + "*F";
            Temp4El.textContent = "Temperature: " + data.daily[3].temp.day + "*F";
            Temp5El.textContent = "Temperature: " + data.daily[4].temp.day + "*F";
            Humid1El.textContent = "Humidity: " + data.daily[0].humidity + "%";
            Humid2El.textContent = "Humidity: " + data.daily[1].humidity + "%";
            Humid3El.textContent = "Humidity: " + data.daily[2].humidity + "%";
            Humid4El.textContent = "Humidity: " + data.daily[3].humidity + "%";
            Humid5El.textContent = "Humidity: " + data.daily[4].humidity + "%";
            var img = document.createElement('img');
            img.src = 'http://openweathermap.org/img/w/' + data.daily[0].weather[0].icon + '.png';
            icon1El.appendChild(img);
            var img = document.createElement('img');
            img.src = 'http://openweathermap.org/img/w/' + data.daily[1].weather[0].icon + '.png';
            icon2El.appendChild(img);
            var img = document.createElement('img');
            img.src = 'http://openweathermap.org/img/w/' + data.daily[2].weather[0].icon + '.png';
            icon3El.appendChild(img);
            var img = document.createElement('img');
            img.src = 'http://openweathermap.org/img/w/' + data.daily[3].weather[0].icon + '.png';
            icon4El.appendChild(img);
            var img = document.createElement('img');
            img.src = 'http://openweathermap.org/img/w/' + data.daily[4].weather[0].icon + '.png';
            icon5El.appendChild(img);
        });
    });
}

    // .catch(function(error) {
    //     //alert if there is a problem
    //     alert("Unable to find your request.")
    // })

//clear icons on click
//add button function for city refresh

