console.log(moment().format("dddd, MMMM Do YYYY"));

$(".cityName").text(cityName);

// day 1 stats
$(".today").text(moment().format("dddd, MMMM Do"));
$(".temp")
$(".humidity")
$(".wind")
$(".uv")

// day 2 stats
$(".day1").text(moment().add(1, 'days').format("dddd, MMMM Do"));
$(".temp1")
$(".humidity1")
$(".wind1")
$(".uv1")

// day 3 stats
$(".day2").text(moment().add(2, 'days').format("dddd, MMMM Do"));
$(".temp2")
$(".humidity2")
$(".wind2")
$(".uv2")

// day 4 stats
$(".day3").text(moment().add(3, 'days').format("dddd, MMMM Do"));
$(".temp3")
$(".humidity3")
$(".wind3")
$(".uv3")

// day 5 stats
$(".day4").text(moment().add(4, 'days').format("dddd, MMMM Do"));
$(".temp4")
$(".humidity4")
$(".wind4")
$(".uv4")

// Create an AJAX call to retrieve data -- Log the data in console
var cityName = "Bountiful"
var APIKey = "5a688da3863b70429be33748b7a10332";
var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey; 

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  // Log the data in HTML
  console.log(queryURL);
  console.log(response);
  var tempK = response.main.temp;
  var tempF = Math.round((tempK - 273.15) * 1.8 + 32);
  console.log(tempF);
  $(".temp").text("Temperature: " + tempF)
});