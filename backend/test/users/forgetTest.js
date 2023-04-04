import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../src/index.js";

// chai.should();
// chai.use(chaiHttp);

// describe("user/forgotpassword test suite", () => {
//  //should register user successfully if the firstname, lastname, username, email and password has been provided

//  it("should register user successfully if all inputs has been provided", (done) => {
//     const result = {
//       firstname: "Test",
//       lastname: "user",
//       username: "Test311",
//       email: "test311@gmail.com",
//       password: "password",
//     };
//     chai
//       .request(server)
//       .post("/user/register")
//       .send(result)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a("object");
//         res.body.should.have.property("result");
//         done();
//       });
//   });
// })
