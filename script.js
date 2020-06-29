console.log(moment().format("dddd, MMMM Do YYYY"));

$("#locationInputButton").on("click", function(event) {
  event.preventDefault()
  // set query URL to pull given city from API
  var APIKey = "5a688da3863b70429be33748b7a10332";
  var cityName = $("#locationInput").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey; 
  console.log("cityName: " + cityName); 
  $(".cityName").text(cityName);

  // Create an AJAX call to retrieve data -- Log the data in console
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
  // Log the data in HTML
  console.log(response);
  
  // populates 5 day forecast
  for (var i = 0; i < 5; i++) {
    var tempK = response.list[i].main.temp;
    var tempF = Math.round((tempK - 273.15) * 1.8 + 32);
    var humidity = response.list[i].main.humidity;
    var wind = response.list[i].wind.speed;
    var description = response.list[i].weather[0].description;
    $(".temp" + i).text("Temperature: " + tempF);
    $(".humidity" + i).text("Humidity: " + humidity);
    $(".wind" + i).text("Wind Speed: " + wind);
    $(".description" + i).text("Conditions: " + description);
  }
  });
})

