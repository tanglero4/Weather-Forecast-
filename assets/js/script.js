// 1. Get the city value from the form API
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function

let apiKey = `1e85ad1f16666a315c273aa6eb03df77`;

fetch(
  "https://api.openweathermap.org/geo/1.0/direct?appid=1e85ad1f16666a315c273aa6eb03df77&q=Orlando"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {});
// Search city function plugs in user input to api url
function searchCity(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?appid=1e85ad1f16666a315c273aa6eb03df77&q=${cityName}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      findWeather(data[0].lat, data[0].lon);
      console.log(data);
    });
}
// Collects city input from user
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  var cityName = document.getElementById("city-input").value;
  searchCity(cityName);
});
// Function to find and display weather information
function findWeather(lat, lon) {
  console.log(lat, lon);
  // Get locations coordinates
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1e85ad1f16666a315c273aa6eb03df77&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    // Collects and displays wether information from the API and attaches it to the HTML
    .then(function (weather) {
      console.log(weather);
      let city = weather.city.name;
      let iconImage = weather.list[0].weather[0].icon;
      let temperature = weather.list[0].main.temp;
      let wind = weather.list[0].wind.speed;
      let humidity = weather.list[0].main.humidity;
      var iconPicture = document.querySelector(".icon");
      iconPicture.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${iconImage}@2x.png`
      );
      document.querySelector(".city-name").textContent = city;
      // Add Current date
      document.querySelector(".current-date").append(new Date().toDateString());
      // Adds temperature to the page
      document.querySelector(".temperature").append(temperature);
      // Adds wind speed to the page
      document.querySelector(".wind").append(wind);
      // Adds humidity level to the page
      document.querySelector(".humidity").append(humidity);
      // Displays daily forecast
      forecast(weather.list);
    });
}
// Loop through the 5 day forecast
function forecast(weather) {
  console.log(weather);
  // Loops through daily weather
  for (i = 0; i < weather.length; i += 8) {
    console.log(weather[i]);
    var div = document.createElement("div");
    div.className = "col-2 border border-info rounded";
    // Adds daily cards and weather information
    var weatherCard = ` 
                <h3 class="first-day p-4 placeholder-wave"></h3>
                <section class="icon"> </section>
                <p>Temp: ${weather[i].main.temp}°F</p>
                <p>Wind: ${weather[i].wind.speed}MPH</p>
                <p>Humidity: ${weather[i].main.humidity}%</p>
    `;
    div.innerHTML = weatherCard;
    document.querySelector(".forecast-list").appendChild(div);
  }
}
