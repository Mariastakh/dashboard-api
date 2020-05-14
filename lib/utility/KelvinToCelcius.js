module.exports = function (temp) {
  const temperatureInCelcius = parseFloat((temp - 273.15).toFixed(2));
  return temperatureInCelcius;
};
