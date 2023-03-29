import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../index.js";

chai.should();
chai.use(chaiHttp);

describe("user/login test suite", () => {
  //should register user successfully if email and password has been provided

  it("should register user successfully if email and password has been provided", (done) => {
    const result = {
      email: "test3@gmail.com",
      password: "test12",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(result)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("userExist");
        done();
      });
  });

  //should throw if email doesn't exist

  it("should throw if email doesn't exist", (done) => {
    const result = {
      email: "test82@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(result)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eq("User doesn't exist");
        done();
      });
  });

  //should throw if password is wrong

  it("should throw if password is wrong", (done) => {
    const result = {
      email: "test3@gmail.com",
      password: "password12",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(result)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message").eq("Invalid Credentials");
        done();
      });
  });

  //should throw when email is missing
  it("should throw when email is missing", (done) => {
    const result = {
      password: "password",
    };
    chai
      .request(server)
      .post("/user/login")
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
      email: "test311@gmail.com",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("password is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });
});
