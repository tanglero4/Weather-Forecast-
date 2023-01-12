// 1. Get the city value from the form API
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function

document.querySelector(".current-date").append(new Date().toDateString());

let apiKey = `1e85ad1f16666a315c273aa6eb03df77`;

fetch(
  "http://api.openweathermap.org/geo/1.0/direct?appid=1e85ad1f16666a315c273aa6eb03df77&q=Orlandos"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

  });

function findWeather(lat, lon) {
  // let lon = data[0].lon;
  // let lat = data[0].lat;
  // console.log(lat, lon);
  fetch(
    `api.openweathermap.org/data/2.5/forecast?id=${cityName}&appid=1e85ad1f16666a315c273aa6eb03df77`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);

      document.querySelector(".city-input").append(cityName);
      //getting the Icon and make an image with it..
      let iconImage = weather.list[0].weather[0].icon;
      console.log(iconImage);
      //   document.querySelector(".icon").append(iconImage);
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
