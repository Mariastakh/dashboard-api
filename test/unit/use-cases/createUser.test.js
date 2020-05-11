const gateway = { execute: jest.fn(() => []) };
const createUser = require("../../../lib/use-cases/CreateUser");

describe("createUser", () => {
  it("should call the gateway with the correct user", async () => {
    const user = { username: "maria", password: "123", email: "me@me.com" };
    await createUser({ user: user, gateway: gateway });
    expect(gateway.execute).toHaveBeenCalledWith(user);
  });
});
