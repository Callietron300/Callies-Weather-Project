//Update Date
const dateTimeText = document.querySelector("#date-time");

const now = new Date();
const min = now.getMinutes();
const hour = now.getHours();
const day = now.getDate();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const month = months[now.getMonth()];

const year = now.getFullYear();

dateTimeText.innerHTML = `${hour}:${min} ${day} ${month} ${year}`;

//DOM Vars
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temp");
const conditionElement = document.querySelector("#condition");
const windElement = document.querySelector("#wind");
const conditionIcon = document.querySelector("#condition-icon");

// Update the Card
function updateCard(response) {
  console.log(response);

  const temperature = Math.round(response.data.temperature.current);
  const city = response.data.city;
  const condition = response.data.condition.description;
  const wind = response.data.wind.speed;
  const conditionImg = response.data.condition.icon_url;

  cityElement.innerHTML = city;
  tempElement.innerHTML = temperature;
  conditionElement.innerHTML = condition;
  windElement.innerHTML = wind;
  conditionIcon.src = `${conditionImg}`;

  getForecast("city");
}

// Search for City
function weatherApiCall(city) {
  const apiKey = "faf1t205ab1o74d732b54981fbc56c80";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCard);
}

//Search outcome
function searchEvent(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-text-input");

  weatherApiCall(searchInput.value);
}

//Search City
const searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", searchEvent);

//Get Forecast
function getForecast(city) {
  const apiKey = "faf1t205ab1o74d732b54981fbc56c80";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(addForecast);
}

//Format day
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];

  return days[date.getDay()];
}

//Insert forcast cards for the week

function addForecast(response) {
  console.log(response);

  const forecastContainer = document.querySelector(".forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-card">
        <p>${formatDate(day.time).toUpperCase()}</p>
        <img src="${day.condition.icon_url}" class="forecast_condition-icon" />
        <p>${Math.round(day.temperature.day)}°</p>
      </div>
    `;
    }
  });

  forecastContainer.innerHTML = forecastHtml;
}

weatherApiCall("London");
addForecast();
