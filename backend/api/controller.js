//models
const about = require("../models/about");
const education = require("../models/education");
const experience = require("../models/experience");
const message = require("../models/messages");
const admin = require('../models/admin');

module.exports = class controller {
  constructor() {
    this.model = { about, education, experience, message, admin };
  }
};
