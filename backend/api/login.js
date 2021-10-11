const controller = require("./controller");

module.exports = new (class login extends controller {
  login(req, res) {
    let admin = this.model.admin((err, admin) => {
      if (err) throw err;
      if (admin) {
        admin.map((admin) => {
          if (req.body.username == admin.username) {
            if (req.body.password == admin.password) {
              return res.json({ success: true });
            } else return res.json({ err: "incorrect password", success: false});
          } else return res.json({ err: "incorrect username", success: false});
        });
      }
    });
  }
})();
