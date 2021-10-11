const controller = require("./controller");

module.exports = new (class experience extends controller {
  index(req, res) {
    this.model.experience.find({}, (err, experience) => {
      if (err) throw err;
      if (experience.length > 0) return res.json({experience});
      else return res.json({ msg: "no data is available" });
    });
  }

  store(req, res) {
    new this.model.experience({
      year: req.body.year,
      title: req.body.title,
      desc: req.body.desc,
    }).save((err) => {
      if (err) throw err;
      else return res.json("about added successfully");
    });
  }
})();
