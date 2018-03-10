$(document).ready(function() {
  // Set variables outside the scope of any sub-functions.
  var initialURL = "https://fcc-weather-api.glitch.me/api/current?";
  var fullURL;
  var latitude;
  var longitude;

  function pathFinder() {
    
    var options = {
      enableHighAccuracy: true
    };
    
    /* Main function below.
    // Uses Geolocation, then pulls info from API.
    */
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      fullURL = initialURL + "lat=" + latitude + "&lon=" + longitude;

      function weatherMaster() {
        $.getJSON(fullURL, function(json) {

          //Variables to get date/time
          var currentDate = new Date();
          var currentTime = currentDate.toLocaleTimeString("en-US");
          var weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ];
          var today = weekday[currentDate.getDay()];

          // Variables for temperature
          var celsius = Math.round(json.main.temp);
          var fahrenheit = Math.round(celsius * 9 / 5 + 32);
          
          // Remove pre-locate
          $("#pre-locate").hide();
          
          // Start of code to fill in weather details
          $(".location").text(json.name);
          $(".day-and-time").text(today + " " + currentTime);
          $(".weather-description").text(json.weather[0].main);
          $(".weather-icon").html(
            "<img class='icon-image' src=" + json.weather[0].icon + ">"
          );
          $("#fahrenheit").html("<p>" + fahrenheit + "&deg;F</p>");
          $("#celsius").html("<p>" + celsius + "&deg;C</p>");
          $("#geolocation-button").text("Check my local weather again");
          if($(".weather-wrapper").css("display") === "none") {
            $(".weather-wrapper").show();
          }

        });
      }
      weatherMaster();
    }

    function failure() {
      if($(".weather-wrapper").css("display") !== "none") {
        $(".weather-wrapper").hide();
        $("#pre-locate").show();
      }
      $("#prelocate-text").text("Couldn't find your location.");
      $("#geolocation-button").text("Try again");
    }

    navigator.geolocation.getCurrentPosition(success, failure, options);
  }

  $("#geolocation-button").click(pathFinder);
});
