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
    const toDoList = JSON.parse(response.text);
    expect(toDoList).toHaveProperty("status");
    expect(toDoList).toHaveProperty("task");
  });

  it("Should let the user add a to-do task", async () => {
    const response = await request("http://localhost:8000")
      .post("/todo")
      .send({ task: "My task", status: "to do" })
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
  });

  it("Should let the user to delete a to-do task", async () => {
    const response = await request("http://localhost:8000").delete("todo/:id");
    expect(response.status).toBe(200);
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
