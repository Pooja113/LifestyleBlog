import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../src/index.js";

chai.should();
chai.use(chaiHttp);

describe("user/register test suite", () => {
  //should register user successfully if the firstname, lastname, username, email and password has been provided

  it("should register user successfully if all inputs has been provided", (done) => {
    const result = {
      firstname: "Test",
      lastname: "user",
      username: "Test311",
      email: "test311@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("result");
        done();
      });
  });

  //should throw when same username has been provided
  it("should throw when same username has been provided", (done) => {
    const result = {
      firstname: "Test",
      lastname: "user",
      username: "Test311",
      email: "test@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("Username must be unique");
        done();
      });
  });

  //should throw when same email has been provided
  it("should throw when same email has been provided", (done) => {
    const result = {
      firstname: "Test",
      lastname: "user",
      username: "Test3",
      email: "test311@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message").eq("User already exists");
        done();
      });
  });

  //should throw when firstname is missing
  it("should throw when firstname is missing", (done) => {
    const result = {
      lastname: "user",
      username: "Test311",
      email: "test311@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("FirstName is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });
  //should throw when lastname is missing
  it("should throw when lastname is missing", (done) => {
    const result = {
      firstname: "user",
      username: "Test311",
      email: "test311@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("Last Name is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  //should throw when username is missing
  it("should throw when username is missing", (done) => {
    const result = {
      firstname: "user",
      lastname: "test",
      email: "test311@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("UserName is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  //should throw when email is missing
  it("should throw when email is missing", (done) => {
    const result = {
      firstname: "user",
      lastname: "test",
      username: "test311",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have
          .property("message")
          .eq("email is a required field");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  //should throw when password is missing
  it("should throw when password is missing", (done) => {
    const result = {
      firstname: "user",
      lastname: "test",
      username: "test311",
      email: "test311@gmail.com",
    };
    chai
      .request(server)
      .post("/user/register")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("password is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });
});
