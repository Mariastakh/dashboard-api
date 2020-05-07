const login = require("../../../lib/use-cases/LoginUser");

describe("login", () => {
  it("should return an error message if no username and password are enterred", async () => {
    const user = {};
    const response = login(user);
    expect(response).toBe("No username or password enterred");
  });

  it("should return an error message if no username has been enterred", async () => {
    const user = { password: "123" };
    const response = login(user);
    expect(response).toBe("No username enterred");
  });

  it("should return an error message if no password has been enterred", async () => {
    const user = { username: "me" };
    const response = login(user);
    expect(response).toBe("No password enterred");
  });
});
