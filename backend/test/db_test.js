const server = require("../server");
const mongoose = require("mongoose");
const config = require("config");
process.env.NODE_ENV = "test";
const should = require("chai").should();

describe("DB test", () => {
  before(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DBHOST, { useNewUrlParser: true });
  });

  it("checking the db connection", (done) => {
    mongoose.connection
      .once("open", () => done())
      .on("error", (err) => {
        console.log(err);
        done();
      });
  });

  after(() => {
    mongoose.connection.close();
  });
});
