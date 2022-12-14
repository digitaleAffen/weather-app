console.log("Hello Gio, you can do it!");

// Forecast HTML

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
  ];

  let forecastHTML = `<div class="card-group">`;
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="card">
            <div class="forecast-day"><strong>${day}</strong></div>
            <img
              src="http://openweathermap.org/img/wn/04d@2x.png"
              alt=""
              width="46"
            />
            <div class="forecast-temp">
              <strong class="forecast-temp-max"> 18° </strong>
              <span class="forecast-temp-min"> 12° </span>
            </div>
          </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Forecast JS

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `47197b56a0c0163cd5fa08701bd89102`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  // https://api.openweathermap.org/data/2.5/onecall?lat=52.5244&lon=13.4105&appid=47197b56a0c0163cd5fa08701bd89102&unitsmetric
  console.log(apiUrl);

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
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

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
  fahrenheitLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celciusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ChangeToCelsius);

function ChangeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  temp.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ChangeToFahrenheit);
