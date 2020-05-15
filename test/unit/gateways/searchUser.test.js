const gateway = require("../../../lib/gateways/searchUser");

const createGateway = (user, error) => {
  db = {
    query: jest.fn(() => {
      if (error) {
        //console.log("inside db error ");
        throw new Error("Database error");
      } else 
        return user;
      
    }),
  };

  return gateway({ db });
};

describe("searchUserTest", () => {
  let user, gateway, result;

  describe("when we call the gateway with a valid user", () => {
    beforeEach(() => {
      user = { username: "Maria" };
      gateway = createGateway([user]);
      result = gateway.execute(user);
    });

    it("should call the database with a valid query", () => {
      expect(
        db.query
      ).toHaveBeenCalledWith(
        "SELECT username, password FROM member where username =$1",
        ["Maria"]
      );
    });

    it("should return a user", () => {
      expect(result.length).toBe(1);
    });
  });

  describe("when we call the gateway with an non-existant user", () => {
    beforeEach(() => {
      user = { username: "nonexistant" };
      const error = true;
      gateway = createGateway(user, true);
      result = gateway.execute(user);
    });

    xit("should throw an error", () => {
      expect(gateway.execute(user)).toThrowError(new Error('yuck, octopus flavor'));
    });
  });
});
