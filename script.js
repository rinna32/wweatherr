import EventBus from "./eventBus.js";
import LocationService from "./services/LocationService.js";
import WeatherService from "./services/WeatherService.js";
import StorageService from "./services/StorageService.js";

const API_KEY = "ebee27a19798f9f0e1aa8449bd035783";

const weatherService = new WeatherService(API_KEY);
const locationService = new LocationService();
const storageService = new StorageService();

const button = document.getElementById("weatherbutton");

EventBus.on("weatherUpdated", (weather) => {
    storageService.setItem("lastWeather", weather);

    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = `
        <p>Город: ${weather.name}</p>
        <p>Температура: ${weather.main.temp} °C</p>
        <p>Погода: ${weather.weather[0].description}</p>
        <p>Влажность: ${weather.main.humidity}%</p>
    `;
});

EventBus.on("weatherError", (error) => {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
});

button.addEventListener("click", async () => {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = "Загрузка...";
    try {
        const position = await locationService.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        await weatherService.getWeatherByCoords(latitude, longitude);
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
    }
});
