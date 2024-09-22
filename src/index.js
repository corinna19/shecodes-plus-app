function refreshWeather(response) {
    let temperatureElement = document.querySelector("#current-temp");
    let temp = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temp);
  
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
  
    let descriptionElement = document.querySelector("#description");
    let descrip = response.data.condition.description;
    descriptionElement.innerHTML =
      descrip.charAt(0).toUpperCase() + descrip.slice(1);
  
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  
    let windElement = document.querySelector("#wind-speed");
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
  
    let feelElement = document.querySelector(".feels-like");
    let feelTemp = response.data.temperature.feels_like;
    feelElement.innerHTML = `${Math.round(feelTemp)}°C`;
  
    let timeElement = document.querySelector("#current-date");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);
  
    let iconElement = document.querySelector("#header-icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  }
  
  function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tueday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[date.getDay()];
  
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
  
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
  
    return `${day}, ${hour}:${minute}`;
  }
  
  function searchCity(city) {
    let apiKey = "b1cfab0b1fb7aobbt7a63cdaa3c47406";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(refreshWeather);
    console.log(apiUrl);
  }
  
  //Searched Location
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
  
    searchCity(searchInputElement.value);
  }
  
  let searchForm = document.querySelector("#searched-form");
  searchForm.addEventListener("submit", search);
  