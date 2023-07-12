process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http"); // let us make the call to server which has all end-points & assert HTTP request
chai.use(chaiHttp); // even when we actually do not start server, mocha internally spawns server when we call chai-http
const expect = require("chai").expect;
const server = require("../../app"); // server with all end-points

describe("Validates JWT token for newsFetch route", () => {
  let jwtToken = ""; // since every login call will create new JWT, so we need to store our token
  beforeEach((done) => {
    let registerBody = {
      name: "test name",
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(registerBody)
      .end((err, registerRes) => {
        let logInBody = {
          email: "test12345@gmail.com",
          password: "test1234",
        };
        chai
          .request(server)
          .post("/auth/login")
          .send(logInBody)
          .end((err, logInRes) => {
            expect(logInRes.status).equal(200);
            expect(logInRes.body.user_obj.user.email).equal(
              "test12345@gmail.com"
            );
            expect(logInRes.body.user_obj.message).equal(
              "User logged in successfully!"
            );
            expect(logInRes.body).to.have.property("token");
            jwtToken = logInRes.body.token.access.token;
            done();
          });
      });
  });

  it("1. Login validates token and fetch news articles", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.articles).to.have.length.gt(0);
        done();
      });
  });

  it("2. Invlaid token", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT ${jwtToken}_INVALID`)
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.text).equal(
          "Invalid JWT token: JsonWebTokenError: invalid signature"
        );
        done();
      });
  });

  it("3. Authorization Header not passed", (done) => {
    chai
      .request(server)
      .get("/news")
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.text).equal("Authorization Header not found");
        done();
      });
  });
});
