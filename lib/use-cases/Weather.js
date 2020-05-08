const axios = require("axios");

module.exports = async () => {
  try {
    const response = await axios.get(
      `https://samples.openweathermap.org/data/2.5/weather?lat=139&lon=35&appid=${process.env.WEATHER_KEY}`
    );

    currentWeather = {
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    };
    return currentWeather;
  } catch (error) {
    console.error(error);
  }
};
