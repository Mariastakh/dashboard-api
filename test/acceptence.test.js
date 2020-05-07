const chai = require('chai');
const http = require("chai-http");
chai.use(http);

describe("Dashboard", () => {
  it("Get / should return status 200", async (done) => {
    chai
      .request("http://localhost:8000/")
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      })
  });
});
