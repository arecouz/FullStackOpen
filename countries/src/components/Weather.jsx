import axios from "axios";

const Weather = () => {
  const API_KEY = "38b858d9d27970fbb938e1dfd8ffd035";
  const CITY_NAME = "london";
  const example = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
    )
    .then((response) => {
      const weatherData = response.data;
      console.log(weatherData);
      // Handle the weather data here
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

export default Weather;
