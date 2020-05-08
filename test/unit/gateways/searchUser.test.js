const gateway = require("../../../lib/gateways/searchUser");

const createGateway = (error) => {
  db = {
    request: jest.fn(async () => {
      if (error) {
        throw new Error("Database error");
      }
      return "Operation was successful";
    }),
  };

  return gateway({ db });
};

describe("gateway", () => {
 xit("queries the database with the appropriate username", async () => {
    const gateway = createGateway([]);
    const user = {username: "Maria"}
    const queryMatch = expect.stringMatching(/username = @username/);
    const paramMatch = expect.arrayContaining([
      {
        id: "username",
        type: "VarChar",
        value: "Maria",
      },
    ]);

    await gateway.execute(user);

    expect(db.request).toHaveBeenCalledWith(queryMatch, paramMatch);
  });
});
