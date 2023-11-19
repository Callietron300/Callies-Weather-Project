//Update Date
let dateTimeText = document.querySelector("#date-time");

let now = new Date();
let min = now.getMinutes();
let hour = now.getHours();
let day = now.getDate();

let months = [
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
let month = months[now.getMonth()];

let year = now.getFullYear();

dateTimeText.innerHTML = `${hour}:${min} ${day} ${month} ${year}`;

// Update the Card
function updateCard(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let condition = response.data.condition.description;
  let wind = response.data.wind.speed;
  let conditionImg = response.data.condition.icon_url;

  console.log(response);

  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let conditionElement = document.querySelector("#condition");
  let windElement = document.querySelector("#wind");
  let conditionIcon = document.querySelector("#condition-icon");

  cityElement.innerHTML = city;
  tempElement.innerHTML = temperature;
  conditionElement.innerHTML = condition;
  windElement.innerHTML = wind;
  conditionIcon.src = `${conditionImg}`;
}

//Search for City
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let apiKey = "faf1t205ab1o74d732b54981fbc56c80";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCard);
}

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", search);
