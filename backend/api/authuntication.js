const controller = require("./controller");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

module.exports = new (class authentication extends controller {
  register(req, res) {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //add admin
    new this.model.admin({
      username: req.body.username,
      password: req.body.password,
    }).save((err) => {
      if (err) throw err;
      return res.json("admin added successfully");
    });
  }

  login(req, res) {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    this.model.admin.findOne(
      { username: req.body.username },
      async function (err, user) {
        if (err) throw err;
        if (user == null) return res.json({auth : false, message : "incorrect username"});
        else
          await bcrypt.compare(
            req.body.password,
            user.password,
            (err, result) => {
              if (err) throw err;
              if (!result) return res.json({auth : false, message : "incorrect password!"});
              if (result) {
                req.session.user = user;
                console.log(req.session.user);
                let payload = { user_id: user._id };
                let token = jwt.sign(payload, process.env.SECRET, {
                  expiresIn: 300,
                });
                return res.json({auth : true, token : token, user});
              }
            }
          );
      }
    );
  }

  logout() {}
})();
