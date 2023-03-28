import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../index.js";

chai.should();
chai.use(chaiHttp);

describe("post/all test suite", () => {
  //should show all the posts
  it("should show all the posts", (done) => {
    chai
      .request(server)
      .get("/post/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("posts");
        done();
      });
  });

  it("should throw if url is wrong", (done) => {
    chai
      .request(server)
      .get("/post/alll")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
