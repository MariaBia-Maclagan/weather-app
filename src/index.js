function formatDate (date) {
    let dateIndex = date.getDay();
    let day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    
    let currentDate = day[dateIndex];
    let currentHour = date.getHours();
    if (currentHour < 10) {
        currentHour = `0${currentHour}`;
    }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
    }
    return `${currentDate} ${currentHour}:${currentMinutes}`;
}
let today = document.querySelector("#current-day-time");
let currentDateTime = new Date();
today.innerHTML = formatDate(currentDateTime);

function changeDegrees(event) {
  event.preventDefault();
  let degreeSwitch = document.querySelector("#fahrenheit-celsius");
  degreeSwitch.innerHTML = `Switch to Celsius`;
}

let degrees = document.querySelector("#fahrenheit-celsius");
degrees.addEventListener("click", changeDegrees);

function showTemperature (response) {

document.querySelector ("#city-name").innerHTML = response.data.name;

let temperature = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector("#temperature-input");
temperatureElement.innerHTML = ` ${temperature}`;

let humidity = Math.round(response.data.main.humidity);
let humidityInput = document.querySelector("#humidity-index");
humidityInput.innerHTML = ` Humidity ${humidity}%`;

let wind = Math.round(response.data.wind.speed);
let windSpeed = document.querySelector("#wind-index");
windSpeed.innerHTML = ` Wind ${wind} km/h`;

let description = response.data.weather[0].main;
let descriptionInput = document.querySelector("#description-index");
descriptionInput.innerHTML = `${description}`;

//document.querySelector ("#temp-max-min-today").innerHtml = Math.round (response.data.main.temp_max);
let maxTemperature = Math.round (response.data.main.temp_max);
let minTemperature = Math.round (response.data.main.temp_min);
let tempMaxMin = document.querySelector ("#temp-max-min-today");
tempMaxMin.innerHTML = `${maxTemperature}° / ${minTemperature}°`;
}

function searchCity(city) {
let apikey ="bb872f49cc68a55123bc66fe7274548f";
let units = "metric";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector ("#enter-city-input").value;
  searchCity(city);
}
searchCity("London");

let chooseCity = document.querySelector ("#search");
chooseCity.addEventListener ("submit", handleSubmit);

function retrivePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apikey ="bb872f49cc68a55123bc66fe7274548f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation (event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(retrivePosition);
}
let currentLocationIcon = document.querySelector ("#current-location");
currentLocationIcon.addEventListener ("click", getCurrentLocation);