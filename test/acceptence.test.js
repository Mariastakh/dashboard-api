const request = require("supertest");

describe("Dashboard", () => {
  it("Should log a user in", async () => {
    const response = await request("http://localhost:8000").post("/").send({name: "me"}, {password: "123"}).set('Accept', 'application/json');
    expect(response.text).toBe("Login Successful!");
  });
});
