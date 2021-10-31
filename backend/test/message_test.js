process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const config = require("config");
const chai = require("chai");
const should = chai.should();
const message = require('../models/messages')
const server = require("../server");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("message api test", () => {
  before(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DBHOST, { useNewUrlParser: true });
  });

  it("check the connection", (done) => {
    mongoose.connection
      .once("open", () => done())
      .on("error", (err) => console.log(err));
    done();
  });

  it("GET portfolio/message", (done) => {
    chai
      .request(server)
      .get("/portfolio/message")
      .end((err, res) => {
        res.should.have.status(200);
        should.not.exist(err);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        for (let i = 0; i < res.body.message.length; i++) {
          res.body.message[i].should.have.property("name");
          res.body.message[i].should.have.property("email");
          res.body.message[i].should.have.property("subject");
          res.body.message[i].should.have.property("message");
        }
        done();
      });
  });

  it("POST portfolio/contact", (done) => {
    chai
      .request(server)
      .post("/portfolio/contact")
      .send({
        name: "name",
        email: "email@email.com",
        subject: "this is the subject",
        message: "this is the message",
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("msg")
          .eql('your message sent!');
        done();
      });
  });

  it("DELETE portfolio/message", (done) => {
    let messageData = message.findOne({
      name: "name",
      email: "email@email.com",
      subject: "this is the subject",
      message: "this is the message"
    });
    let id = messageData._id;
    chai
      .request(server)
      .delete(`/portfolio/message/${id}`)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.have.property("msg").eql("message deleted");
        done();
      });
  });

  after(() => mongoose.connection.close());
});
