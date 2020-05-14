const KelvinToCelcius = require("../../../lib/utility/KelvinToCelcius");

describe("kelvinToCelcius", () => {
  it("should correctly cnovert from kevlins to celcius", async () => {
    expect(KelvinToCelcius(285)).toBe(11.85);
  });
});
