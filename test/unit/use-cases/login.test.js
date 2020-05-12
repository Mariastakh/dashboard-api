const login = require("../../../lib/use-cases/LoginUser");

describe("login", () => {
  xit("should return an error message if no username and password are enterred", async () => {
    const user = {};
    const response = login({ user: user });
    expect(response).toBe("No username or password enterred");
  });

  
});
