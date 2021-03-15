var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");

var formSumbitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    get5Day(city);
    cities.unshift({ city });
    cityInputEl.value = "";
  }
    var getCityWeather = function (city) {
      var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}"
      var apiKey = "a2c68e41b6bef4c63d34adb268031723"

      fetch(apiURL)
        .then(function (response) {
          response.json().then(function (data) {
            displayWeather(data, city);
          });
        });
    };

    var displayWeather = function (weather, searchCity) {
      weatherContainerEl.textContent = "";
      citySearchInputEl.textContent = searchCity;

      console.log(weather);

      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
      citySearchInputEl.appendChild(currentDate);

      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
      citySearchInputEl.appendChild(weatherIcon);

      var temperatureEl = document.createElement("span");
      temperatureEl.textContent = "Temperature: " + weather.main.temp + " °C";
      temperatureEl.classList = "list-group-item"

      var humidityEl = document.createElement("span");
      humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
      humidityEl.classList = "list-group-item"

      var windSpeedEl = document.createElement("span");
      windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " KPH";
      windSpeedEl.classList = "list-group-item"

      weatherContainerEl.appendChild(temperatureEl);
      weatherContainerEl.appendChild(humidityEl);
      weatherContainerEl.appendChild(windSpeedEl);


    }
  }

  var get5Day = function (city) {
    var apiKey = "a2c68e41b6bef4c63d34adb268031723"
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}"

    fetch(apiURL)
      .then(function (response) {
        response.json().then(function (data) {
          display5Day(data);
        });
      });
  };

  var display5Day = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
      var dailyForecast = forecast[i];


      var forecastEl = document.createElement("div");
      forecastEl.classList = "card bg-primary text-light m-2";

      var forecastDate = document.createElement("h5")
      forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
      forecastDate.classList = "card-header text-center"
      forecastEl.appendChild(forecastDate);

      var weatherIcon = document.createElement("img")
      weatherIcon.classList = "card-body text-center";
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
      forecastEl.appendChild(weatherIcon);

      var forecastTempEl = document.createElement("span");
      forecastTempEl.classList = "card-body text-center";
      forecastTempEl.textContent = dailyForecast.main.temp + " °F";
      forecastEl.appendChild(forecastTempEl);

      var forecastHumEl = document.createElement("span");
      forecastHumEl.classList = "card-body text-center";
      forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
      forecastEl.appendChild(forecastHumEl);
      forecastContainerEl.appendChild(forecastEl);
    }

  }

cityFormEl.addEventListener("submit", formSumbitHandler);
