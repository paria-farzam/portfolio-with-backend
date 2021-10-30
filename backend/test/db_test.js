const server = require("../server");
const mongoose = require("mongoose");
const config = require("config");
process.env.NODE_ENV = "test";
const should = require("chai").should();

//import models
const about = require("../models/about");
const admin = require("../models/admin");
const education = require("../models/education");
const experience = require("../models/experience");
const messages = require("../models/messages");

describe("DB test", () => {
  before(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DBHOST, { useNewUrlParser: true });
  });

  it("checking the db connection", (done) => {
    mongoose.connection
    .once("open", () => done())
    .on("error", (error) => {console.log(error); done();});
  });

  describe("chacking about db", () => {
    it("it should save data in about model", async() => {
      let aboutData = new about({
        career: "career",
        name: "name",
        desc: "desc",
      })
      aboutData = await aboutData.save();

      aboutData.should.be.a('object');
      aboutData.should.have.property('career');
      aboutData.should.have.property('name');
      aboutData.should.have.property('desc');
    });
  });

  after(() => {
    mongoose.connection.close();
  });
});
