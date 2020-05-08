const axios = require("axios");

module.exports = (options) => {
    axios.get("http://api.openweathermap.org/data/2.5/weather?q=London&APPID="); 
}