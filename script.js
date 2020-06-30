console.log(moment().format("dddd, MMMM Do YYYY"));
var localArr =[]

$("#locationInputButton").on("click", populate);

function populate(event) {
  event.preventDefault()
  
  // set query URL to pull searched city from API
  var APIKey = "5a688da3863b70429be33748b7a10332";
  var cityName = $("#locationInput").val() // would like to make this show up capitalized even if input is lowercase
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey; 
  console.log("cityName: " + cityName); 

  // sets header as the searched city
  $(".cityName").text(cityName);

  // Create an AJAX call to retrieve data
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
  // Log the data in console
  console.log(response);
  
  // populates 5 day forecast
  for (var i = 0; i < 5; i++) {
    var date = moment().add(i, 'days').format("dddd, MMMM Do");
    var tempK = response.list[i].main.temp;
    var tempF = Math.round((tempK - 273.15) * 1.8 + 32);
    var humidity = response.list[i].main.humidity;
    var wind = response.list[i].wind.speed;
    var description = response.list[i].weather[0].description;
    $(".day" + i).text(date);
    $(".temp" + i).text("Temperature: " + tempF + "F");
    $(".humidity" + i).text("Humidity: " + humidity + "%");
    $(".wind" + i).text("Wind Speed: " + wind + " kmh")
    $(".description" + i).text("Conditions: " + description);
  }
});
  // saves historical search and saves as button
  function saveSearch () {
    var historyButton = $("<button>").text($("#locationInput").val())
    $(".searchBtns").append(historyButton);
    $(".searchBtns").append("<br>");

    // creates object and saves to local storage
    var citySearch = {
      city : cityName
    }
    localArr.push(citySearch)
    localStorage.setItem("citySearch", JSON.stringify(localArr))
  };
  saveSearch();

  // Need to get history buttons to go repull that location***********

  // clears search field and restores placeholder value
  $(".reset").val("")
  $(".reset").attr({
    "Placeholder": "Location"
  })
}
// on refresh need last searched city to pull up
function refreshPopulate () {
  var fromLocalStorage = JSON.parse(localStorage.getItem("citySearch"))
  if (fromLocalStorage != null) {
    for (var i = 0; i < fromLocalStorage.length; i++) {
      localArr.push(fromLocalStorage[i])
    }
    console.log(localArr);
    for (var j = 0; j < localArr.length; j++) {
      var createButton = document.createElement("button");
      console.log(localArr[j].city)
      createButton.textContent = localArr[j].city
      $(".searchBtns").append(createButton)
      
    }
  }
}
refreshPopulate()