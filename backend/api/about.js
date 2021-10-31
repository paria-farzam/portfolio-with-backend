const controller = require("./controller");

module.exports = new (class about extends controller {
  index(req, res) {
    this.model.about.find({}, (err, about) => {
      if (err) throw err;
      if (about.length > 0) return res.json({about});
      else return res.json({ msg: "there is no info" });
    });
  }

  store(req, res) {
    new this.model.about({
      career: req.body.career,
      name: req.body.name,
      desc: req.body.desc,
    }).save((err) => {
      if (err) throw err;
      else return res.json({msg : "about added successfully"});
    });
  }
})();