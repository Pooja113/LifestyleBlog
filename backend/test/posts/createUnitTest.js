import { describe, it, after } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { server } from "../../src/index.js";
import Post from "../../src/model/postModel.js";

chai.should();
chai.use(chaiHttp);

describe("post/create test suite", () => {
  after(async () => {
    await Post.deleteMany({});
  });
  //should create the post successfully if the title and description are provided

  it("should create the post successfully if the title and description are provided", (done) => {
    const result = {
      title: "Lorem Ipsum Heading",
      description:
        "Lorem Ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("result");
        done();
      });
  });

  //should throw if title is missing
  it("should throw if title is missing", (done) => {
    const result = {
      description:
        "Lorem Ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis. vLorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("Title is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  //should throw if description is missing
  it("should throw if description is missing", (done) => {
    const result = {
      title: "Lorem Ipsum",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property("message").eq("Description is required");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  ///should throw if title length is exceeded

  it("should throw if title length is exceeded", (done) => {
    const result = {
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.",
      description:
        "Lorem Ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have
          .property("message")
          .eq("title must be at most 30 characters");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  // it('should throw if title length is less than 8')
  it("should throw if title length is less than 8", (done) => {
    const result = {
      title: "lorem i",
      description:
        "Lorem Ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam, omnis voluptas adipisci minus enim molestias facere veritatis perferendis.",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have
          .property("message")
          .eq("title must be at least 8 characters");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });

  // it('should throw if description must be at least 60 characters')
  it("should throw if description must be at least 60 characters", (done) => {
    const result = {
      title: "Lorem ipsum dolor, sit amet  ",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      image:
        "https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg",
    };
    chai
      .request(server)
      .post("/post/create")
      .send(result)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have
          .property("message")
          .eq("description must be at least 60 characters");
        res.body.should.have.property("type").eq("ValidationError");
        done();
      });
  });
});
