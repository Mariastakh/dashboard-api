const chai = require('chai');
const http = require("chai-http");
chai.use(http);


describe("Dashboard", () => {
  it("Should log a user in", async (done) => {
    chai
      .request("http://localhost:8000")
      .post("/")
      .type('form')
      .send({
          '_method': 'put',
          'user': 'me',
          'password': '123'
      })
      .then((res) => {
        expect(res.body).toBe("Login Successful!");
        done();
      })
  });
});
