const login = require("../../../lib/use-cases/LoginUser");

describe("login", () => {
  it("should return an error message if no username and password are enterred", async () => {
    const user = {};
    const response = login({ user: user });
    expect(response).toBe("No username or password enterred");
  });

  it("should return an error message if no username has been enterred", async () => {
    const user = { password: "123" };
    const response = login({ user: user });
    expect(response).toBe("No username enterred");
  });

  it("should return an error message if no password has been enterred", async () => {
    const user = { username: "me" };
    const response = login({ user: user });
    expect(response).toBe("No password enterred");
  });

  it("should return an error message if a username is unrecognised", async () => {
    gateway = { execute: jest.fn(() => "Username not recognised") };

    const user = { username: "unknown user", password: "123" };
    const response = login({ user: user, gateway: gateway });
    expect(response).toBe("Username not recognised");
  });

  it("should return an error message if a password is incorrect", async () => {
    gateway = { execute: jest.fn(() => "Incorrect password") };

    const user = { username: "me", password: "incorrect_password" };
    const response = login({ user: user, gateway: gateway });
    expect(response).toBe("Incorrect password");
  });

  it("should return a confirmation message if login was successful", async () => {
    gateway = { execute: jest.fn(() => "Login successful!") };
    const user = { username: "me", password: "123" };

    const response = login({ user: user, gateway: gateway });
    expect(response).toBe("Login successful!");
  });
});
