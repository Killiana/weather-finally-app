let now = new Date();
document.querySelector("#minutes").innerHTML = now.getMinutes();
document.querySelector("#hours").innerHTML = now.getHours();
let minutes = now.getMinutes;
if (minutes < 10) {
  minute = `0${minutes}`;
}
let hours = now.getHours;
if (hours < 10) {
  hours = `0${hours}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.querySelector("#day").innerHTML = days[now.getDay()];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastData = response.data.daily;
  forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri"];
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecast =
        forecast +
        ` <div class="col-2">
           <div class="forecast-date">
            ${formatDay(forecastDay.dt)}
            </div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="">
            <div class="forecast-temp">
            
              <span class="forecast-max">  ${forecastDay.temp.max}
                  </span>
                <span class="forecast-min">   ${forecastDay.temp.min}</span>
</div>
        </div>`;
    }
  });

  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `168e1d15822e79c675ec6a7c184689e9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showForecast(response) {
  celsElement = Math.round(response.data.main.temp);
  document.querySelector("#temper").innerHTML = Math.round(celsElement);
  document.querySelector("h1").innerHTML = response.data.name;
  console.log(response.data);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "168e1d15822e79c675ec6a7c184689e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function findCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  search(input.value);
}

let searchElement = document.querySelector("#form");
searchElement.addEventListener("submit", findCity);

function findFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temper");
  let tempEl = Math.round((celsElement * 9) / 5 + 32);
  temp.innerHTML = tempEl;
  celsiusLink.classList.remove("active");
  fahrLink.classList.add("active");
}

function findCels(event) {
  event.preventDefault();
  document.querySelector("#temper").innerHTML = celsElement;
  celsiusLink.classList.add("active");
  fahrLink.classList.remove("active");
}
let celsElement = null;
let fahrLink = document.querySelector("#fahr-link");
document.querySelector("#fahr-link").addEventListener("click", findFahr);
let celsiusLink = document.querySelector("#cels-link");
celsiusLink.addEventListener("click", findCels);
search("New Orleans");
