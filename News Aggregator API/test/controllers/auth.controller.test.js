process.env.NODE_ENV = "test";

const { User } = require("../../models");
const bcrypt = require("bcrypt");
let chai = require("chai");
let chaiHttp = require("chai-http"); // let us make the call to server which has all end-points & assert HTTP request
chai.use(chaiHttp); // even when we actually do not start server, mocha internally spawns server when we call chai-http
const expect = require("chai").expect;
const sinon = require("sinon");
const server = require("../../app"); // server with all end-points

describe("Verifies register flow with actual mongo db calls", () => {
  let registerBody;

  beforeEach((done) => {
    registerBody = {
      name: "test name",
      email: "test12345@gmail.com",
      password: "test1234",
    };
    done();
  });

  it("1. Validate successfull register", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send(registerBody)
      .end((err, res) => {
        // console.log("ERROR: ", err);
        // if (err) {
        //   expect(res.status).equal(400);
        //   expect(res.body.message._message).equal("User validation failed");
        //   done();
        // }
        expect(res.status).equal(201);
        expect(res.body.message).equal("User Registered Successfully!");
        done();
      });
  });

  it("2. Failing to register because of email validation", (done) => {
    registerBody.email = "test@12345@gmail.com";
    chai
      .request(server)
      .post("/auth/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message.message).equal(
          "User validation failed: email: invalid email"
        );
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });

  it("3. Failing to register because of invalid user body", (done) => {
    delete registerBody.name;
    chai
      .request(server)
      .post("/auth/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message.message).equal(
          "User validation failed: name: name not provided "
        );
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });
});

describe("Verifies the register flow with stubbed mongo db calls", () => {
  let saveStub;
  let registerBody = {
    name: "test name",
    email: "test12345@gmail.com",
    password: "test1234",
  };

  beforeEach((done) => {
    saveStub = sinon.stub(User.prototype, "save");
    done();
  });

  afterEach(() => {
    saveStub.restore();
  });

  it("1. Successful register with mocked call", (done) => {
    const mockUser = {
      _id: "123",
      name: "test name",
      email: "test12345@gmail.com",
    };
    saveStub.resolves(mockUser);
    chai
      .request(server)
      .post("/auth/register")
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        expect(res.body.message).equal("User Registered Successfully!");
        done();
      });
  });
});

describe("Verifies log-in flow with actual mongo db calls", () => {
  // creating user as a pre-requisites for each it block of log-in flow
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
      .end((err, res) => {
        done(); // since we have already tested register flow above, so no need to register again
      });
  });

  it("1. Validate successfull login", (done) => {
    let logInBody = {
      email: "test12345@gmail.com",
      password: "test1234",
    };
    chai
      .request(server)
      .post("/auth/login")
      .send(logInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.user_obj.user.email).equal("test12345@gmail.com");
        expect(res.body.user_obj.user.name).equal("test name");
        expect(res.body.user_obj.message).equal("User logged in successfully!");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("2. Invalid password while logging in", (done) => {
    let logInBody = {
      email: "test12345@gmail.com",
      password: "test12345",
    };
    chai
      .request(server)
      .post("/auth/login")
      .send(logInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.user).to.be.null;
        expect(res.body.message).equal("Incorrect password!");
        done();
      });
  });

  it("3. User does not exist while logging in", (done) => {
    let logInBody = {
      email: "someOtherTest@gmail.com",
      password: "test12345",
    };
    chai
      .request(server)
      .post("/auth/login")
      .send(logInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.user).to.be.null;
        expect(res.body.message).equal("User not found with given email");
        done();
      });
  });
});

/*describe("Verifies the login flow with stubbed mongo db calls", () => {
  let findOneStub;
    let logInBody = {
      email: "test12345@gmail.com",
      password: bcrypt.hashSync('test1234', 8),
    };

  // const logInBody = new User({
  //   email: "test1234@gmail.com",
  //   password: bcrypt.hashSync("test1234", 8),
  // });

  beforeEach((done) => {
    findOneStub = sinon.stub(User, "findOne");
    done();
  });

  afterEach((done) => {
    findOneStub.restore();
    done();
  });

  it("1. Validate successfull login", (done) => {
    const mockUser = {
      _id: "123",
      name: "test name",
      email: "test12345@gmail.com",
    };
    findOneStub.resolves(mockUser);
    chai
      .request(server)
      .post("/auth/login")
      .send(logInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.user_obj.user.email).equal("test12345@gmail.com");
        expect(res.body.user_obj.user.name).equal("test name");
        expect(res.body.user_obj.message).equal("User logged in successfully!");
        expect(res.body).to.have.property("token");
        done();
      });
  });
});
*/
