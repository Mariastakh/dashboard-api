const signUpUserGateway = require("../../../lib/gateways/createUserGateway");

class dbStub {}

const createGateway = (user, databaseError) => {
  db = new dbStub();
  db.query = jest.fn(async () => {
    if (databaseError) {
      throw new Error("Database error");
    }
    return "user created";
  });

  return signUpUserGateway({ db });
};

describe("signUpUserGateway", () => {
  it("creates a user in the database", async () => {
    debugger;
    const user = { username: "maria", password: "123", email: "maria@me" };
    const gateway = createGateway([]);

    await gateway.execute(user);

    expect(
      db.query
    ).toHaveBeenCalledWith(
      "INSERT INTO member (username, password, email) VALUES ($1, $2, $3)",
      [user.username, user.password, user.email]
    );
  });

  it("catches an error if it is thrown", async () => {
    const gateway = createGateway([{ notAField: "badEntry" }, true]);
    expect(await gateway.execute()).toBeUndefined();
  });
});
