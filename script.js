import WeatherService from "./services/WeatherService.js";
import LocationService from "./services/LocationService.js";
import StorageService from "./services/StorageService.js";

const API_KEY = "ebee27a19798f9f0e1aa8449bd035783";

const weatherService = new WeatherService(API_KEY);
const locationService = new LocationService();
const storageService = new StorageService();

const button = document.getElementById("weatherbutton");
const weatherInfo = document.getElementById("weatherInfo");

button.addEventListener("click", async () => {
    weatherInfo.innerHTML = "Загрузка...";
    try {
        const position = await locationService.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const weather = await weatherService.getWeatherByCoords(latitude, longitude);

        storageService.setItem("lastWeather", weather);

        weatherInfo.innerHTML = `
            <p>Город: ${weather.name}</p>
            <p>Температура: ${weather.main.temp} °C</p>
            <p>Погода: ${weather.weather[0].description}</p>
            <p>Влажность: ${weather.main.humidity}%</p>
        `;
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
    }
});
