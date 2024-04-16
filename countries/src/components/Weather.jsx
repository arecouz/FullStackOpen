import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({
    temp: null,
    feelsLike: null,
    wind: null,
    icon: null,
  });
  const API_KEY = import.meta.env.VITE_SOME_KEY;

  const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        const weatherData = response.data;
        console.log(weatherData);
        setWeather({
          temp: toCelsius(weatherData.main.temp),
          feelsLike: toCelsius(weatherData.main.feels_like),
          wind: weatherData.wind.speed,
          icon: weatherData.weather[0].icon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  console.log(weather);

  return (
    <div>
      <h3>
        Weather:{" "}
        {weather.icon && (
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt="weather icon"
          ></img>
        )}
      </h3>
      <p>Temperature: {weather.temp}</p>
      <p>Feels like: {weather.feelsLike}</p>
      <p>Wind speed: {weather.wind}</p>
    </div>
  );
};

export default Weather;
