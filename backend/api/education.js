const controller = require("./controller");

module.exports = new (class education extends controller {
  index(req, res) {
    this.model.education.find({}, (err, education) => {
      if (err) throw err;
      if (education.length > 0) return res.json({education});
      else return res.json({ msg: "no data is available" });
    });
  }

  store(req, res) {
    new this.model.education({
      year: req.body.year,
      title: req.body.title,
      desc: req.body.desc,
    }).save((err) => {
      if (err) throw err;
      else return res.json("about added successfully");
    });
  }
})();
