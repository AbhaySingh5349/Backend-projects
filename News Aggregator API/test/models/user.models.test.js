const { User } = require("../../models");
const bcrypt = require("bcrypt");
const userService = require("../../services/user.service");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("Testing user model by actual db call", () => {
  it("1. Creates new user successfully", async () => {
    const user = {
      name: "ab",
      email: "test@gmail.com",
      password: "tes1t",
    };

    const user_obj = await userService.createUser(user);
    expect(user_obj.user).not.to.be.null;
  }).timeout(10000);

  it("2. Invalid email", async () => {
    const user = {
      name: "ab",
      email: "@test@gmail.com",
      password: "tes1t",
    };
    const user_obj = await userService.createUser(user);
    expect(user_obj.message.message).equal(
      "User validation failed: email: invalid email"
    );
  });

  it("3. Validate password having at least 1 character, 1 number & minimum length 3", async () => {
    const user = {
      name: "ab",
      email: "@test@gmail.com",
      password: "tes1t",
    };
    const isValidPassword = await User.isStrongPassword(user.password);
    expect(isValidPassword).equal(true);
  });
});

describe("Stubbing user data for testing Save document functionality of db", () => {
  let saveStub;
  const user = new User({
    name: "Test User",
    email: "test1234@gmail.com",
    password: bcrypt.hashSync("test1234", 8),
  });

  beforeEach(() => {
    saveStub = sinon.stub(User.prototype, "save"); // stub will intercept the call whenever "save" is called on User schema
  });

  afterEach(() => {
    saveStub.restore(); // restoring stub after each call (as we cannot re-stub already stubbed function)
  });

  it("1. Creates new user successfully", async () => {
    const mockUser = {
      _id: "123",
      name: "Test User",
      email: "test1234@gmail.com",
    };
    saveStub.resolves(mockUser); // telling stub that resolve whenever it is called

    // no need to write try-catch, as irrespective of whatever happens, it will be resolved
    const result = await user.save(); // this will not call actual db, it will be redirected to `saveStub.resolves(mockUser);`
    expect(result).to.deep.equal(mockUser);
    expect(saveStub.calledOnce).to.be.true;
  });

  it("2. should handle error", async () => {
    const mockError = new Error("Database error");
    saveStub.rejects(mockError);

    try {
      await user.save();
    } catch (err) {
      expect(err).to.equal(mockError);
      expect(saveStub.calledOnce).to.be.true;
    }
  });
});
