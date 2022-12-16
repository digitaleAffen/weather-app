console.log("Hello Gio, you can do it!");

// Forecast HTML

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastData = response.data.daily;

  let forecastHTML = `<div class="card-group">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="card">
            <div class="forecast-day"><strong>${forecastFormatDay(
              forecastDay.dt
            )}</strong></div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="46"
            />
            <div class="forecast-temp">
              <strong class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}° </strong>
              <span class="forecast-temp-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Forecast JS

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  // https://api.openweathermap.org/data/2.5/onecall?lat=52.5244&lon=13.4105&appid=a43564c91a6c605aeb564c9ed02e3858&unitsmetric

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Real Feel: ${Math.round(
    response.data.main.feels_like
  )}°`;

  // icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;

  // forecast data
  getForecast(response.data.coord);

  // Update suggestion

  let suggestionElement = document.querySelector("#suggestion");
  suggestionElement.innerHTML = Math.round(celciusTemperature);

  let h3 = document.querySelector("#suggestion");
  if (celciusTemperature > 30) {
    h3.innerHTML = `Warm 🥵 Remember to use sunscreen`;
  } else if (celciusTemperature < 29 && celciusTemperature > 17) {
    h3.innerHTML = `Beatiful day 🤠 Most people consider this temperature ideal.`;
  } else if (celciusTemperature < 16 && celciusTemperature > 4) {
    h3.innerHTML = `Cool 😊 With a light jacket or sweater you will be fine.`;
  } else if (celciusTemperature < 16 && celciusTemperature > 4) {
    h3.innerHTML = `It's chilly 🤔 Jacket or sweater is recommended.`;
  } else if (celciusTemperature < 3 && celciusTemperature > -3) {
    h3.innerHTML = `It's cold in here 🥶 Remember to wear a coat and a hat. Also consider pack your gloves and a scarf.`;
  } else if (celciusTemperature < -4 && celciusTemperature > -12) {
    h3.innerHTML =
      "Brr 🥶 It's freezing in here. Coat, hat, gloves and a scarf are appropriate.";
  } else if (celciusTemperature < -13) {
    h3.innerHTML = `Brr 🥶 Caution advised. Limited outdoor activity recommended. Wear winter clothing that covers as much of the body as possible.`;
  } else {
    h3.innerHTML = "Have a nice day! 😊";
  }
  console.log(celciusTemperature);

  //
}

// Change the city

function searchSubmited(city) {
  let apiKey = "47197b56a0c0163cd5fa08701bd89102";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //https://api.openweathermap.org/data/2.5/weather?q=&appid=47197b56a0c0163cd5fa08701bd89102&lat=52.5139968&lon=13.4709248

  axios.get(apiUrl).then(displayTemperature);
}

searchSubmited("Berlin");

function searchButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchSubmited(cityInput.value);

  let h1 = document.querySelector("#city");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchButton);

// Local Day and Hour
let currentDate = new Date();

// Local Day

function formatDay(currentDate) {
  let days = [
    "Sunday,",
    "Monday,",
    "Tuesday,",
    "Wednesday,",
    "Thusday,",
    "Friday,",
    "Saturday,",
  ];

  let currentDay = days[currentDate.getDay()];

  return currentDay;
}

let formattedDay = document.querySelector("#current-day");
formattedDay.innerHTML = formatDay(currentDate);

// Forecast Day

function forecastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Local Hour

function formatHour(currentDate) {
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentTime = `${currentHour}:${currentMinutes} h`;

  return currentTime;
}

let formattedHour = document.querySelector("#current-hour");
formattedHour.innerHTML = formatHour(currentDate);

// Change the °C and °F

let celciusTemperature = null;

function ChangeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celciusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ChangeToCelsius);

function ChangeToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ChangeToFahrenheit);
