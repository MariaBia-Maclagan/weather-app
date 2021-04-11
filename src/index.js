function formatDate(timestamp) {
  let date = new Date(timestamp);
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
function showTemperature (response) {

document.querySelector ("#city-name").innerHTML = response.data.name;
document.querySelector("#temperature-input").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity-index").innerHTML = Math.round(response.data.main.humidity);
document.querySelector("#wind-index").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description-index").innerHTML = response.data.weather[0].main;

let today = document.querySelector("#current-day-time");
today.innerHTML = formatDate(response.data.dt * 1000);

let maxTemperature = Math.round (response.data.main.temp_max);
let minTemperature = Math.round (response.data.main.temp_min);
let tempMaxMin = document.querySelector ("#temp-max-min-today");
tempMaxMin.innerHTML = `${maxTemperature}° / ${minTemperature}°`;

let icon = document.querySelector("#icon");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description);

celsiusTemperature = response.data.main.temp;
}
celsiusTemperature = null;
//maxTemperature = null;
//minTemperature = null;

function changeDegreesCelsius (event) {
  event.preventDefault();
  let degreeSwitch = document.querySelector("#fahrenheit-celsius");
  degreeSwitch.innerHTML = `Switch to Fahrenheit`;

  let temperatureElement = document.querySelector("#temperature-input");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let celsius = document.querySelector("#degree-celsius-input");
  celsius.innerHTML =`°C`;

}

function changeDegreesFahrenheit(event) {
  event.preventDefault();
  let degreeSwitch = document.querySelector("#fahrenheit-celsius");
  degreeSwitch.innerHTML = `Switch to Celsius`;

  let temperatureElement = document.querySelector("#temperature-input");
  temperatureElement.innerHTML = Math.round(celsiusTemperature * 9/5+32);

  let fahrenheit = document.querySelector("#degree-celsius-input");
  fahrenheit.innerHTML =`°F`;

  //let maxTemp = Math.round (maxTemperature * 9/5+32);
  //let minTemp = Math.round (minTemperature * 9/5+32);
  //let tempMaxMin = document.querySelector ("#temp-max-min-today");
  //tempMaxMin.innerHTML = `${maxTemp}° / ${minTemp}°`;

 let degrees = document.querySelector("#fahrenheit-celsius");
 degrees.addEventListener("click", changeDegreesCelsius);
}

let degrees = document.querySelector("#fahrenheit-celsius");
degrees.addEventListener("click", changeDegreesFahrenheit);

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

searchCity("London");