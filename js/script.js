var list = JSON.parse(localStorage.getItem('city')) || [];

// lists cities on the page
var cityDisplay = function(list) {
    // empties html
    $("list-group").empty();

// iterates over the list
for (var i = 0; i < list.length; i++) {
    //create new var to hold the li tag
    var searchCity = $('<li>');
    searchCity.text(list[i]);

    //adds city to the list
    $("list-group").append(searchCity);
}
};

$('#city').on("click", function(event) {
    event.preventDefault();

    //get city value and store as var
    var city = $("city")
    .val()
    .trim();
    //add new city to list
    list.push(city);
    cityDisplay(list);

    //save city in local storage
    localStorage.setItem("list-group", JSON.stringify(list));

    //clear search box
    $("search").val('');
});
