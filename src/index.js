console.log("Hello Gio, you can do it!");

// Change the Day and Hour to the current one
let currentDate = new Date();

//Day

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

// Hour

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

  let h1 = document.querySelector("#country");
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
