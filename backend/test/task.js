import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../index.js";

chai.should();
chai.use(chaiHttp);
describe("APIs", () => {
  describe("GET /post/all", () => {
    it("show all posts", (done) => {
      chai
        .request(server)
        .get("/post/all")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          //   response.body.should.have
          //     .property("message")
          //     .eql("Post Created Successfully");
          done();
        });
    });

    // it("It should not get posts", (done) => {
    //   chai
    //     .request(server)
    //     .get("/post/alll")
    //     .end((err, response) => {
    //       response.should.have.status(404);
    //       done();
    //     });
    // });
  });
});
