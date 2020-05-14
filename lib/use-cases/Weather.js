const axios = require("axios");
const KelvinToCelcius = require("../utility/KelvinToCelcius");

module.exports = async (options) => {
  try {
    const lat = options.location.lat;
    const lon = options.location.lon;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`
    );

    const convertedTemperature = KelvinToCelcius(response.data.main.temp);

    currentWeather = {
      location: response.data.name,
      temperature: convertedTemperature,
      description: response.data.weather[0].description,
    };
    return currentWeather;
  } catch (error) {
    console.error(error);
  }
};
