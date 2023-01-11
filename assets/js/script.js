// 1. Get the city value from the form API
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather

let apiKey = `1e85ad1f16666a315c273aa6eb03df77`;

fetch(
  "http://api.openweathermap.org/geo/1.0/direct?appid=1e85ad1f16666a315c273aa6eb03df77&q=Orlando"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    findWeather(data[0].lat, data[0].lon);
  });

function findWeather(lat, lon) {
  console.log(lat, lon);
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);

      let cityName = weather.city.name;
      document.querySelector(".city-name").append(cityName);
      //getting the Icon and make an image with it..
      let iconImage = weather.list[0].weather[0].icon;
      console.log(iconImage);
      document.querySelector(".icon").append(iconImage);
      let weatherIcon = document.createElement("img");

      let temperature = weather.list[0].main.temp;
      document.querySelector(".temperature").append(temperature);

      let wind = weather.list[0].wind.speed;
      document.querySelector(".wind").append(wind);

      let humidity = weather.list[0].main.humidity;
      document.querySelector(".humidity").append(humidity);
      console.log(weather);

      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconImage}@2x.png`
      );

      document.querySelector(".today-icon").append(weatherIcon);
    });
}
