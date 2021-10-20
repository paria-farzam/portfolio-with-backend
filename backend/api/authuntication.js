const controller = require("./controller");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const admin = require("../models/admin");

module.exports = new (class authentication extends controller {
  async register(req, res) {
    const {username, password} = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check if username is exist
    this.model.admin.find({username : username}, (err, admins)=>{
      if(err) throw err;
      
      console.log(admins)
      if(admins.length > 0){
        return res.json('user already exist');
      }
    });

    //add admin
    new this.model.admin({
      username: username,
      password: password,
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
                // localStorage.setItem('token', token);
                return res.json([token]);
              }
            }
          );
      }
    );
  }

  logout() {}
})();
