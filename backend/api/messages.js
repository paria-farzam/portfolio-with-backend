const controller = require("./controller");

module.exports = new (class messages extends controller {
  index(req, res) {
    this.model.message.find({}, (err, message) => {
      if (err) throw err;
      if (message.length > 0) return res.json({ message });
    });
  }

  store(req, res) {
    new this.model.message({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
  }
})();
