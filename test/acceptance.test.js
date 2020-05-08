const request = require("supertest");

describe("Dashboard", () => {
  it("Should signup a new user", async () => {
    const response = await request("http://localhost:8000")
      .post("/signup")
      .send({ name: "me", password: "123" })
      .setEncoding("Accept", "application/json");
    expect(response.text).toBe("Sign-Up Successful!");
  });
  
  it("Should log a user in", async () => {
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

  it("Should have a football update", async () => {
    const response = await request("http://localhost:8000").get("/football");
    expect(response.text).toContain("football");
  });

  it("Should have photos", async () => {
    const response = await request("http://localhost:8000").get("/photos");
    expect(response.text).toContain("paths");
  });
});
