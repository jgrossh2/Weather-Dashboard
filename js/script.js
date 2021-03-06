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
var uvEl = document.querySelector('#uv');


//dates for weather
var displayDay= moment().format('L');
console.log(displayDay);
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

var list = JSON.parse(localStorage.getItem('cities')) || [];

// lists cities on the page
var cityDisplay = function(city) {
    //clear search box
    $(".form-control").val('');
    console.log("clear");
    $("#cities").empty();

    // iterates over the list
    for (var i = 0; i < list.length; i++) {
    //creates button and attribute
    var searched = $('<button>');
    searched.attr('data-city', list[i]);
    searched.addClass('submit');
    searched.text(list[i]);
    console.log("hello");
    //adds city to the list
    $("#cities").append(searched);
    console.log("hi");
    }
};

var cityWeather = function(city) {
    console.log(city);
    // current weather for the city
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=88b149a9b0c90bf60cb6281f413f1412';
    fetch (apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data, city);
        var tempEl = document.querySelector('#temp');
        var humidEl = document.querySelector('#humid');
        tempEl.textContent = "Temperature: " + data.main.temp + " °F";
        humidEl.textContent = "Humidity: " + data.main. humidity + " %";
        var windEl = document.querySelector('#wind');
        windEl.textContent = "Wind: " + data.wind.speed + " MPH";
        //get lat and lon from api to use for uv api
        var lat = data.coord.lat;
        var lon = data.coord.lon;
    
        var apiUrlUv = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=88b149a9b0c90bf60cb6281f413f1412';
        fetch (apiUrlUv)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        var uv = data.value;
         uvEl.textContent = uv;
         if (uv > 7 || uv === 7) {
            $("#uv").addClass("bg-danger");
            $("#uv").removeClass("bg-success");
            $("#uv").removeClass("bg-warning");
        } else if 
            (uv < 7 && uv > 4) {
            $("#uv").addClass("bg-warning");
            $("#uv").removeClass("bg-danger");
            $("#uv").removeClass("bg-success");
        } else {
            $("#uv").addClass("bg-success");
            $("#uv").removeClass("bg-warning");
            $("#uv").removeClass("bg-danger");
        }
        });

        //api for 5 day forecast
        var upiForecast = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly,alerts&units=imperial&appid=88b149a9b0c90bf60cb6281f413f1412';
        fetch (upiForecast) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data, city)
            //5 day forecast details
            Temp1El.textContent = "Temperature: " + data.daily[0].temp.day + "°F";
            Temp2El.textContent = "Temperature: " + data.daily[1].temp.day + "°F";
            Temp3El.textContent = "Temperature: " + data.daily[2].temp.day + "°F";
            Temp4El.textContent = "Temperature: " + data.daily[3].temp.day + "°F";
            Temp5El.textContent = "Temperature: " + data.daily[4].temp.day + "°F";
            Humid1El.textContent = "Humidity: " + data.daily[0].humidity + "%";
            console.log(data.daily[0].humidity);
            Humid2El.textContent = "Humidity: " + data.daily[1].humidity + "%";
            Humid3El.textContent = "Humidity: " + data.daily[2].humidity + "%";
            Humid4El.textContent = "Humidity: " + data.daily[3].humidity + "%";
            Humid5El.textContent = "Humidity: " + data.daily[4].humidity + "%";
            var img1 = document.createElement('img');
            img1.src = 'http://openweathermap.org/img/w/' + data.daily[0].weather[0].icon + '.png';
            icon1El.textContent = "";
            icon1El.appendChild(img1);

            var img2 = document.createElement('img');
            img2.src = 'http://openweathermap.org/img/w/' + data.daily[1].weather[0].icon + '.png';
            icon2El.textContent = "";
            icon2El.appendChild(img2);

            var img3 = document.createElement('img');
            img3.src = 'http://openweathermap.org/img/w/' + data.daily[2].weather[0].icon + '.png';
            icon3El.textContent = "";
            icon3El.appendChild(img3);

            var img4 = document.createElement('img');
            img4.src = 'http://openweathermap.org/img/w/' + data.daily[3].weather[0].icon + '.png';
            icon4El.textContent = "";
            icon4El.appendChild(img4);

            var img5 = document.createElement('img');
            img5.src = 'http://openweathermap.org/img/w/' + data.daily[4].weather[0].icon + '.png';
            icon5El.textContent = "";
            icon5El.appendChild(img5);
        
        });
    });
}
$('.btn').on("click", function(event) {
    event.preventDefault();
    console.log("cities")

    //get city value and store as var
    var city = $(".form-control")
        .val()
        .trim();
    //add new city to list
    list.push(city);
    //update list on page
    $('#cities').append(city);
    cityDisplay(city);
    console.log("here")
    
    //save city in local storage
    localStorage.setItem('cities', JSON.stringify(list));
    $(".form-control").val('');
    cityWeather(city);

// function currentDisplay(city) {
    //using api to get icon id to use for url icon image
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=88b149a9b0c90bf60cb6281f413f1412';
    fetch (apiUrl) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var img = document.createElement('img');
        img.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        
    currentDayEl.innerHTML = city + " (" + displayDay + ") ";
    currentDayEl.appendChild(img);
    })
    $("#cities .submit").on("click", function(event) {
        event.preventDefault();
        console.log($(this).attr("data-city"));
        //searches attr of button for searched city
        var searchCity = $(this).attr("data-city");
        console.log($(this).attr("data-city"));
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=88b149a9b0c90bf60cb6281f413f1412';
        fetch (apiUrl) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var img = document.createElement('img');
            img.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            
        currentDayEl.innerHTML = searchCity + " (" + displayDay + ") ";
        currentDayEl.appendChild(img);
        // currentDisplay(searchCity);
        
    });
    cityWeather(searchCity);  
    console.log("madeit");
    });
});




