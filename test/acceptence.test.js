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
    expect(response.text).toContain("widgets");
    
  });

  it("Should have a to do list", async () => {
    const response = await request("http://localhost:8000").get("/todo");
    expect(response.text).toContain("to do list");
  });

  it("Should have the news", async () => {
    const response = await request("http://localhost:8000").get("/news");
    expect(response.text).toContain("news");
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
