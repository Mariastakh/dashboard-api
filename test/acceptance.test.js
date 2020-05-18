const request = require("supertest");

describe("Dashboard", () => {
  xit("Should signup a new user", async () => {
    const response = await request("http://localhost:8000")
      .post("/signup")
      .send({ name: "me", password: "123", email: "maria@me" })
      .setEncoding("Accept", "application/json");
    expect(response.status).toBe(201);
  });

  xit("Should log a user in", async () => {
    const response = await request("http://localhost:8000")
      .post("/")
      .send({ name: "james", password: "smelly" })
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });

  xit("Should have a list of all the widgets", async () => {
    const response = await request("http://localhost:8000").get("/dashboard");
    expect(response.text).toContain("location");
  });

  xit("Should have a to do list", async () => {
    const response = await request("http://localhost:8000").get("/todo");
    expect(response.text).toContain("to do list");
  });

  xit("Should have the news", async () => {
    const response = await request("http://localhost:8000").get("/news");
    const news = JSON.parse(response.text);
    expect(news).toHaveProperty("title");
    expect(news).toHaveProperty("link");
    expect(news).toHaveProperty("content");
  });

  xit("Should have a football update", async () => {
    const response = await request("http://localhost:8000").get("/sport");
    expect(response.text).toContain("football");
  });

  xit("Should have photos", async () => {
    const response = await request("http://localhost:8000").get("/photos");
    expect(response.text).toContain("paths");
  });
});
