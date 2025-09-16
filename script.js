document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById("weatherbutton");
  const weatherInfoEl = document.getElementById("weatherInfo");
  const apiKey = "b8d18e4522e4dffb943436b17b7796f4";


 btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      weatherInfoEl.innerText = "Геолокация не поддерживается этим браузером";
      return;
    }


    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=ru&appid=${apiKey}`;
      const res = await fetch(url);


    function showWeather({ weather, main, name }) {
    weatherInfoEl.innerHTML = `
      <p>Погода: ${weather[0].description}</p>
      <p>Температура: ${main.temp}°C</p>
      <p>Город: ${name}</p>
    `;
  }
  

      if (res.ok) {
        const data = await res.json();
        showWeather(data);
      } else {
        weatherInfoEl.innerText = "Ошибка при получении данных о погоде";
      }
    }, () => weatherInfoEl.innerText = "Не удалось получить вашу геолокацию");
  });
});