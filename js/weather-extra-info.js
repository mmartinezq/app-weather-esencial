import { createDOM } from "./utils/dom.js";

function templateWeatherFeatures({ temp_max, temp_min, wind, humidity }) {
  return `
  <div class="weather-features">
  <p class="weather-max">Max: <strong>${temp_max}°</strong></p>
  <p class="weather-min">Min: <strong>${temp_min}°</strong></p>
  <p class="weather-wind">Viento: <strong>${wind} km/h</strong></p>
  <p class="weather-humidity">Humedad: <strong>${humidity}%</strong></p>
</div>
  `;
}

export function createWeatherFeatures(weather) {
  const data = {
    temp_max: weather.main.temp_max,
    temp_min: weather.main.temp_min,
    humidity: weather.main.humidity,
    wind: weather.wind.speed,
  };

  return createDOM(templateWeatherFeatures(data));
}