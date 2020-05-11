const gateway = require("../../../lib/gateways/searchUser");

const createGateway = (user, error) => {
  db = {
    query: jest.fn(async () => {
      if (error) {
        throw new Error("Database error");
      }
      return user;
    }),
  };

  return gateway({ db });
};

describe("gateway", () => {
  it("queries the database with the correct query", async () => {
    const gateway = createGateway([]);
    const user = { username: "Maria" };

    await gateway.execute(user);

    expect(
      db.query
    ).toHaveBeenCalledWith(
      "SELECT username, password FROM member where username =$1",
      ["Maria"]
    );
  });
});
