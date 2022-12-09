console.log("Hello Gio, you can do it!");

function displayTemperature(response) {
  console.log(response.data);
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
}

let apiKey = "47197b56a0c0163cd5fa08701bd89102";
let city = "berlin";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
//https://api.openweathermap.org/data/2.5/weather?q=&appid=47197b56a0c0163cd5fa08701bd89102&lat=52.5139968&lon=13.4709248

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);

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

// Change the city

function searchButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let h1 = document.querySelector("#city");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

let cityButton = document.querySelector("#city-form");
cityButton.addEventListener("submit", searchButton);

// Change the °C and °F

function ChangeToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${3}`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ChangeToCelsius);

function ChangeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${38}`;
  //   temp.innerHTML = Math.round((temp * 9) / 5 + 32);
  //console.log("#fahrenheit-link");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ChangeToFahrenheit);

console.log("Gio, you are great!");
