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
  .then(function (data) {
    // for (i = 0; i < 5; i+6) {
    //
    // }
  });
function searchCity(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?appid=1e85ad1f16666a315c273aa6eb03df77&q=${cityName}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      findWeather(data[0].lat, data[0].lon);
      // for (i = 0; i < 5; i+6) {
      //
      console.log(data);
      // }
    });
}
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  var cityName = document.getElementById("city-input").value;
  searchCity(cityName);
});

function findWeather(lat, lon) {
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1e85ad1f16666a315c273aa6eb03df77&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);
      let city = weather.city.name;
      console.log(city);
      document.querySelector(".city-name").textContent = city;
      // city = document.querySelector(".city-name").append(city);
      document.querySelector(".current-date").append(new Date().toDateString());
      //getting the Icon and make an image with it..
      let iconImage = weather.list[0].weather[0].icon;
      console.log(iconImage);
      //   document.querySelector(".icon").append(iconImage);
      // let weatherIcon = document.createElement("img");

      let temperature = weather.list[0].main.temp;
      document.querySelector(".temperature").append(temperature);

      let wind = weather.list[0].wind.speed;
      document.querySelector(".wind").append(wind);

      let humidity = weather.list[0].main.humidity;
      document.querySelector(".humidity").append(humidity);
      console.log(weather);
      var iconPicture = document.querySelector(".icon");
      iconPicture.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${iconImage}@2x.png`
      );

      forecast(weather.list);
    });
}
function forecast(weather) {
  console.log(weather);
  for (i = 0; i < weather.length; i += 8) {
    console.log(weather[i]);
    var div = document.createElement("div");
    div.className = "col-2 border border-info rounded";
    var weatherCard = ` 
                <h3 class="first-day p-4 placeholder-wave"></h3>
                <section class="icon"></section>
                <p>Temp: ${weather[i].main.temp}°F</p>
                <p>Wind: ${weather[i].wind.speed}MPH</p>
                <p>Humidity: ${weather[i].main.humidity}%</p>
    `;
    div.innerHTML = weatherCard;
    document.querySelector(".forecast-list").appendChild(div);
  }
}
