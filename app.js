const api_key = "your_api_key";

function check(x) {
  switch (x) {
    case "Clouds":
      document.querySelector("#weather_icon").src = "img/cloudy.png";
      break;
    case "Rain":
      document.querySelector("#weather_icon").src = "img/rain.png";
      break;
    case "Thunderstorm":
      document.querySelector("#weather_icon").src = "img/storm.png";
      break;
    case "Drizzle":
      document.querySelector("#weather_icon").src = "img/rain.png";
      break;
    case "Snow":
      document.querySelector("#weather_icon").src = "img/snow.png";
      break;
    default:
      document.querySelector("#weather_icon").src = "img/day_cloud.png";
      break;
  }
}

window.addEventListener("load", (event) => {
  const success = (position) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}`
    )
      .then((response) => response.json())
      .then(async (data) => {
        let temperature = await data.main.feels_like;
        temperature = (temperature - 273.15).toFixed(1);
        document.getElementById("temperature_value").innerHTML = temperature;

        check(data.weather[0].main);

        let humidity = await data.main.humidity;
        document.getElementById("humidity_value").innerHTML = humidity;

        let wind = await data.wind.speed;
        document.getElementById("wind_value").innerHTML = wind;

        document.querySelector("#place_result").innerHTML = await data.name;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const error = (err) => {
    console.log(err);
  };

  navigator.geolocation.getCurrentPosition(success, error);
});

function update() {
  let place = document.querySelector("#place_input").value;
  document.querySelector("#place_input").value = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`
  )
    .then((response) => response.json())
    .then(async (data) => {
      check(data.weather[0].main);

      let temperature = await data.main.temp;
      temperature = (temperature - 273.15).toFixed(1);
      document.getElementById("temperature_value").innerHTML = temperature;

      let humidity = await data.main.humidity;
      document.getElementById("humidity_value").innerHTML = humidity;

      let wind = await data.wind.speed;
      document.getElementById("wind_value").innerHTML = wind;

      place = place.charAt(0).toUpperCase() + place.slice(1);

      document.querySelector("#place_result").innerHTML = place;
    })
    .catch((err) => {
      console.log(err);
    });
}

document.querySelector("#place_input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    update();
  }
});
