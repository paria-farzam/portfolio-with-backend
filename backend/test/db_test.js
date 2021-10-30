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

  //test db connection
  it("checking the db connection", (done) => {
    mongoose.connection
      .once("open", () => done())
      .on("error", (error) => {
        console.log(error);
        done();
      });
  });

  //test about model
  describe("about model", () => {
    it("it should save data in about model", async () => {
      let aboutData = new about({
        career: "career",
        name: "name",
        desc: "desc",
      });
      aboutData = await aboutData.save();

      aboutData.should.be.a("object");
      aboutData.should.have.property("career");
      aboutData.should.have.property("name");
      aboutData.should.have.property("desc");
    });

    it("it should find data from about model", async () => {
      let aboutData = await about.find({});
      aboutData.should.be.a("array");
      aboutData[0].should.have.property("career");
      aboutData[0].should.have.property("name");
      aboutData[0].should.have.property("desc");
    });
  });

  //test admin model
  describe("admin model", () => {
    it("add new admin", async () => {
      let newAdmin = new admin({
        username: "admin",
        password: "1234",
      });
      newAdmin = await newAdmin.save();

      newAdmin.should.be.a("object");
      newAdmin.should.have.property("username");
      newAdmin.should.have.property("password");
    });

    it("find all admins", async () => {
      let newAdmin = await admin.find({});

      newAdmin.should.be.a("array");

      for (let i = 0; i < newAdmin.length; i++) {
        newAdmin[i].should.be.a("object");
        newAdmin[i].should.have.property("username");
        newAdmin[i].should.have.property("password");
      }
    });
  });

  //test education model
  describe("test education model", () => {
    it("add new education", async () => {
        let newEducation = new education({
          year: "2021",
          title: "education title",
          desc : "this is the description"
        });
        newEducation = await newEducation.save();
  
        newEducation.should.be.a("object");
        newEducation.should.have.property("year");
        newEducation.should.have.property("title");
        newEducation.should.have.property("desc");
      });
  });

  after(() => {
    mongoose.connection.close();
  });
});
