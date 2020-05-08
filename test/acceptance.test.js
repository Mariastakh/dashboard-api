const request = require("supertest");

describe("Dashboard", () => {
  xit("Should log a user in", async () => {
    const response = await request("http://localhost:8000")
      .post("/")
      .send({ name: "me", password: "123" })
      .set("Accept", "application/json");
    expect(response.text).toBe("Login Successful!");
  });

  xit("Should have a list of all the widgets", async () => {
    const response = await request("http://localhost:8000").get("/dashboard");
    expect(response.text).toContain("location");
  });

  it("Should have a to do list", async () => {
    const response = await request("http://localhost:8000").get("/todo");
    expect(response.text).toContain("to do list");
  });

  it("Should have the news", async () => {
    const response = await request("http://localhost:8000").get("/news");
    const news = JSON.parse(response.text);
    expect(news).toHaveProperty("title");
    expect(news).toHaveProperty("link");
    expect(news).toHaveProperty("content");
  });

  it("Should have a football update for a team", async () => {
    const response = await request("http://localhost:8000").get(
      "/football/Inter"
    );
   // const teamsBeaten = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(response.text).toHaveProperty("teams");
  });

  it("Should have photos", async () => {
    const response = await request("http://localhost:8000").get("/photos");
    expect(response.text).toContain("paths");
  });
});
