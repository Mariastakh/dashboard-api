gateway = require("../../../lib/gateways/verifyUser");

const createGateway = (error) => {
  db = {
    request: jest.fn(async () => {
      if (error) {
        throw new Error("Database error");
      }
      return "Operation was successful";
    }),
  };
};

describe("gateway", () => {
  it("queries the database with the appropriate username", async () => {
    const gateway = createGateway([]);
    const username = "Maria";
    const queryMatch = expect.stringMatching(/username = @username/);
    const paramMatch = expect.arrayContaining([
      {
        id: "",
        type: "VarChar",
        value: "Maria",
      },
    ]);

    await gateway.execute(username);

    expect(db.request).toHaveBeenCalledWith(queryMatch, paramMatch);
  });
});
