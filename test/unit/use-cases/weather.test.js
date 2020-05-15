const weather = require("../../../lib/use-cases/Weather");

describe("weather", () => {
  xit("should show the temperature in celcius", async () => {
    const weatherUpdate = await weather();
    // testing an external service here
  });
});
